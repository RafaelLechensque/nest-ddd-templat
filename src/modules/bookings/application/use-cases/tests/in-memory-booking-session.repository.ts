/* eslint-disable @typescript-eslint/require-await */
import { BookingSession } from '../../../domain/entities/booking-session.entity';
import { BookingType } from '../../../domain/enums/booking-type.enum';
import { IBookingSessionRepository } from '../../repositories/booking-session-repository.interface';

export class InMemoryBookingSessionRepository implements IBookingSessionRepository {
  // Nosso "banco de dados" temporário é apenas um array na memória
  public items: BookingSession[] = [];
  public allStationsInRoom = ['pc-01', 'pc-02', 'pc-03', 'pc-04', 'pc-05'];

  async save(session: BookingSession): Promise<void> {
    this.items.push(session);
  }

  async findOverlappingStations(
    roomId: string,
    stationIds: string[],
    startTime: Date,
    endTime: Date,
  ): Promise<boolean> {
    // Simula a mesma lógica do banco de dados usando funções de array do JS
    const conflict = this.items.find((booking) => {
      const isSameRoom = booking.roomId === roomId;
      const hasTimeOverlap =
        booking.startTime < endTime && booking.endTime > startTime;

      // Verifica se alguma máquina bate OU se já é um campeonato bloqueando tudo
      const hasStationConflict =
        booking.type === BookingType.TOURNAMENT ||
        booking.stationIds.some((id) => stationIds.includes(id));

      return isSameRoom && hasTimeOverlap && hasStationConflict;
    });

    return !!conflict;
  }

  async findOccupiedStationIds(
    roomId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<string[]> {
    // 1. Filtra apenas os agendamentos que colidem no mesmo horário e sala
    const occupiedStations = this.items
      .filter((booking) => {
        const isSameRoom = booking.roomId === roomId;
        const hasTimeOverlap =
          booking.startTime < endTime && booking.endTime > startTime;
        return isSameRoom && hasTimeOverlap;
      })
      // 2. Extrai e junta todos os IDs de computadores ocupados em um único array
      .flatMap((booking) => booking.stationIds);

    // 3. Retorna apenas os ocupados (removendo duplicados com o Set)
    return [...new Set(occupiedStations)];
  }
}
