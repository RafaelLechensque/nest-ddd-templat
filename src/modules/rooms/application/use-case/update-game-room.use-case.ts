import { IPcStationRepository } from '../../../pcs/application/repositories/pc-station-repository.inteface';
import { PcStation } from '../../../pcs/domain/entities/pc-station.entity';
import { GameRoom } from '../../domain/entities/game-room.entity';
import { RoomType } from '../../domain/enums/room-type.enum';
import { IGameRoomRepository } from '../repositories/game-room-repository.inteface';

export type UpdateRoomInput = Partial<{
  name: string;
  type: RoomType;
  stations_ids: string[];
}>;

export class UpdateGameRoomUseCase {
  constructor(
    private readonly gameRoomRepo: IGameRoomRepository,
    private readonly pcStationRepo: IPcStationRepository,
  ) {}

  async execute(id: string, updates: UpdateRoomInput): Promise<GameRoom> {
    const room = await this.gameRoomRepo.findByid(id);

    if (!room) throw new Error('Sala nao encontrada');

    const { name, stations_ids, type } = updates;

    let stations: PcStation[] = room.stations;

    if (stations_ids) {
      stations = stations_ids.length
        ? await this.pcStationRepo.findByIds(stations_ids)
        : [];

      const foundIds = new Set(stations.map((station) => station.id));

      const missingIds = stations_ids?.filter((id) => !foundIds.has(id)) ?? [];

      if (missingIds.length > 0) {
        throw new Error(
          `Pc stations não encontradas: ${missingIds.join(', ')}`,
        );
      }
    }

    if ([name, stations_ids, type].some((value) => value !== undefined)) {
      room.updateSpecs(
        name ?? room.name,
        type ?? room.type,
        stations ?? room.stations,
      );

      await this.gameRoomRepo.save(room);
    }

    return room;
  }
}
