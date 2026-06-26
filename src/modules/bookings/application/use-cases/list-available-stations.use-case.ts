import { IBookingSessionRepository } from '../repositories/booking-session-repository.interface';

export interface ListAvailableStationsInput {
  roomId: string;
  startTime: string;
  endTime: string;
}

export class ListAvailableStationsUseCase {
  constructor(private readonly bookingRepository: IBookingSessionRepository) {}

  async execute(input: ListAvailableStationsInput): Promise<string[]> {
    const { roomId, startTime, endTime } = input;
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      throw new Error(
        'O horário de início deve ser menor que o horário de término.',
      );
    }

    // Lista fixa simulando os PCs existentes na sala vip
    const allStationsInRoom = ['pc-01', 'pc-02', 'pc-03', 'pc-04', 'pc-05'];

    // Busca no banco os que já estão rodando algum jogo naquele horário
    const occupiedStations =
      await this.bookingRepository.findOccupiedStationIds(roomId, start, end);

    // Filtra: Retorna apenas os PCs que NÃO estão na lista de ocupados
    const availableStations = allStationsInRoom.filter(
      (stationId) => !occupiedStations.includes(stationId),
    );

    return availableStations;
  }
}
