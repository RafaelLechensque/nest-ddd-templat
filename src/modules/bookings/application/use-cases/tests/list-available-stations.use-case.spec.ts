// src/modules/bookings/application/use-cases/tests/list-available-stations.use-case.spec.ts
import { BookingSession } from '../../../domain/entities/booking-session.entity';
import { BookingType } from '../../../domain/enums/booking-type.enum';
import { ListAvailableStationsUseCase } from '../list-available-stations.use-case';
import { InMemoryBookingSessionRepository } from './in-memory-booking-session.repository';

describe('ListAvailableStationsUseCase (Unit Tests)', () => {
  let repository: InMemoryBookingSessionRepository;
  let sut: ListAvailableStationsUseCase;

  beforeEach(() => {
    repository = new InMemoryBookingSessionRepository();
    sut = new ListAvailableStationsUseCase(repository);
  });

  it('deve listar as estações disponíveis para um horário específico', async () => {
    // CORREÇÃO: Criando a entidade usando o método legítimo do DDD
    const bookingSession = BookingSession.create('booking-123', {
      gamerId: 'gamer-123',
      roomId: 'sala-vip',
      stationIds: ['pc-01', 'pc-02'],
      startTime: new Date('2026-06-10T14:00:00.000Z'),
      endTime: new Date('2026-06-10T16:00:00.000Z'),
      type: BookingType.DUO,
    });

    await repository.save(bookingSession);

    // Ação: Listar estações disponíveis para o mesmo horário (com overlap das 15h às 16h)
    const input = {
      roomId: 'sala-vip',
      startTime: '2026-06-10T15:00:00.000Z',
      endTime: '2026-06-10T17:00:00.000Z',
    };

    const result = await sut.execute(input);

    // Verificação
    expect(result).toEqual(expect.not.arrayContaining(['pc-01', 'pc-02']));
    expect(result).toEqual(expect.arrayContaining(['pc-03', 'pc-04', 'pc-05']));
    expect(result).toHaveLength(3);
  });
});
