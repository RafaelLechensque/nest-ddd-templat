import { GameRoom } from '../../domain/entities/game-room.entity';
import { IGameRoomRepository } from '../repositories/game-room-repository.inteface';
import { ListGameRoomFilterInput } from './dtos/list-game-room-filter.dto';

export class ListGameRoomUseCase {
  constructor(private readonly gameRoomRepository: IGameRoomRepository) {}

  async execute(filter: ListGameRoomFilterInput): Promise<GameRoom[]> {
    const { name, stations_ids, type } = filter;

    if (name || stations_ids || type)
      return await this.gameRoomRepository.findAll(name, type, stations_ids);

    return await this.gameRoomRepository.findAll();
  }
}
