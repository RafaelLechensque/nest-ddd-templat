import { BookingType } from '../../../domain/enums/booking-type.enum';
import { BookingSession } from '../../../domain/entities/booking-session.entity';
import { CreateBookingUseCase } from '../create-booking.use-case';
import { InMemoryBookingSessionRepository } from './in-memory-booking-session.repository';

describe('CreateBookingUseCase (Unit Tests)', () => {
  let repository: InMemoryBookingSessionRepository;
  let sut: CreateBookingUseCase; // SUT = System Under Test (O que estamos testando)

  beforeEach(() => {
    // Reinicia o repositório e o caso de uso antes de cada teste
    repository = new InMemoryBookingSessionRepository();
    sut = new CreateBookingUseCase(repository);
  });

  it('deve ser capaz de criar uma reserva de sessão SOLO com sucesso', async () => {
    const input = {
      gamerId: 'gamer-123',
      roomId: 'sala-vip',
      stationIds: ['pc-01'],
      startTime: '2026-06-10T14:00:00.000Z',
      endTime: '2026-06-10T16:00:00.000Z',
      type: BookingType.SOLO,
    };

    const response = await sut.execute(input);

    expect(response).toHaveProperty('bookingId');
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0].id).toBe(response.bookingId);
  });

  it('não deve permitir criar uma reserva se o PC já estiver ocupado no mesmo horário', async () => {
    // 1. Cenário: Já inserimos uma reserva existente diretamente no nosso repositório fake
    const inputExistente = {
      gamerId: 'gamer-antigo',
      roomId: 'sala-vip',
      stationIds: ['pc-01'],
      startTime: '2026-06-10T14:00:00.000Z',
      endTime: '2026-06-10T16:00:00.000Z',
      type: BookingType.SOLO,
    };

    const sessionExistente = BookingSession.create('id-existente', {
      ...inputExistente,
      startTime: new Date(inputExistente.startTime),
      endTime: new Date(inputExistente.endTime),
    });

    await repository.save(sessionExistente);

    // 2. Ação: Tentamos criar uma NOVA reserva para o MESMO pc e horário conflitante
    const novoInputConflitante = {
      gamerId: 'novo-gamer',
      roomId: 'sala-vip',
      stationIds: ['pc-01'], // Conflito aqui!
      startTime: '2026-06-10T15:00:00.000Z', // Dentro do horário da reserva anterior
      endTime: '2026-06-10T17:00:00.000Z',
      type: BookingType.SOLO,
    };

    // 3. Validação: O caso de uso deve estourar um erro rejeitando a operação
    await expect(sut.execute(novoInputConflitante)).rejects.toThrow(
      'Um ou mais computadores selecionados já estão reservados para este horário (ou há um campeonato na sala).',
    );

    // O array do banco fake deve continuar apenas com a primeira reserva
    expect(repository.items).toHaveLength(1);
  });

  it('deve disparar erro de domínio se tentarmos fazer reserva TEAM com apenas 1 PC', async () => {
    const inputInvalido = {
      gamerId: 'capitao-time',
      roomId: 'arena-5v5',
      stationIds: ['pc-01'], // Erro: Tipo TEAM exige exatamente 5 PCs
      startTime: '2026-06-10T14:00:00.000Z',
      endTime: '2026-06-10T16:00:00.000Z',
      type: BookingType.TEAM,
    };

    // O erro aqui será lançado de dentro da Entidade BookingSession (Regra de domínio pura)
    await expect(sut.execute(inputInvalido)).rejects.toThrow(
      'Reservas TEAM devem conter exatamente 5 PCs para o time.',
    );
  });
});
