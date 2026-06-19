import { randomUUID } from 'crypto';
import { GameRoom } from '../../domain/entities/game-room.entity';
import { RoomType } from '../../domain/enums/room-type.enum';
import { IGameRoomRepository } from '../repositories/game-room-repository.inteface';
import { IPcStationRepository } from '../../../pcs/application/repositories/pc-station-repository.inteface';

interface CreateGameRoomInput {
  name: string;
  type: RoomType;
  stations_ids?: string[];
}

export class CreateGameRoomUseCase {
  constructor(
    private readonly gameRoomRepository: IGameRoomRepository,
    private readonly pcStationRepository: IPcStationRepository,
  ) {
    console.log({
      gameRoomRepository,
      pcStationRepository,
    });
  }

  async execute(input: CreateGameRoomInput): Promise<GameRoom> {
    const generatedId = randomUUID();

    const { name, type, stations_ids } = input;

    const stations = stations_ids?.length
      ? await this.pcStationRepository.findByIds(stations_ids)
      : [];

    const foundIds = new Set(stations.map((station) => station.id));

    const missingIds = stations_ids?.filter((id) => !foundIds.has(id)) ?? [];

    if (missingIds.length > 0) {
      throw new Error(`Pc stations não encontradas: ${missingIds.join(', ')}`);
    }

    const newGameRoom = GameRoom.create(generatedId, {
      name,
      type,
      stations,
    });

    await this.gameRoomRepository.save(newGameRoom);

    return newGameRoom;
  }
}
