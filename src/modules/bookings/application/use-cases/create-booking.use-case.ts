import { randomUUID } from 'crypto';
import { BookingSession } from '../../domain/entities/booking-session.entity';
import { BookingType } from '../../domain/enums/booking-type.enum';
import { IBookingSessionRepository } from '../repositories/booking-session-repository.interface';

export interface CreateBookingInput {
  gamerId: string;
  roomId: string;
  stationIds: string[];
  startTime: string; // Vem como string do HTTP
  endTime: string;
  type: BookingType;
}
export class CreateBookingUseCase {
  constructor(private readonly bookingRepository: IBookingSessionRepository) {}

  async execute(input: CreateBookingInput): Promise<{ bookingId: string }> {
    const start = new Date(input.startTime);
    const end = new Date(input.endTime);

    // 1. Regra de Negócio Cruzada: Verificar disponibilidade no Banco de Dados
    const hasConflict = await this.bookingRepository.findOverlappingStations(
      input.roomId,
      input.stationIds,
      start,
      end,
    );

    if (hasConflict) {
      throw new Error(
        'Um ou mais computadores selecionados já estão reservados para este horário (ou há um campeonato na sala).',
      );
    }

    const generatedId = randomUUID();

    // 2. Instanciar a Entidade de Domínio (onde rodam as validações de regras SOLO/DUO/TEAM)
    const bookingSession = BookingSession.create(generatedId, {
      gamerId: input.gamerId,
      roomId: input.roomId,
      stationIds: input.stationIds,
      startTime: start,
      endTime: end,
      type: input.type,
    });

    // 3. Persistir no banco de dados
    await this.bookingRepository.save(bookingSession);

    return { bookingId: bookingSession.id };
  }
}
