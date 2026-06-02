import { BookingSession } from '../../domain/entities/booking-session.entity';

export abstract class IBookingSessionRepository {
  abstract save(bookingSession: BookingSession): Promise<void>;

  // Busca se já existe algum PC ocupado naquela sala em um determinado período
  abstract findOverlappingStations(
    roomId: string,
    stationIds: string[],
    startTime: Date,
    endTime: Date,
  ): Promise<boolean>;
}
