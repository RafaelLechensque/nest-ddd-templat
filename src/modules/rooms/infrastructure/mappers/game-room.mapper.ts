import { PcStationMapper } from '../../../pcs/infrastructure/mappers/pc-station.mapper';
import { GameRoom } from '../../domain/entities/game-room.entity';
import { GameRoomOrmEntity } from '../entities/game-room.orm-entity';

export class GameRoomMapper {
  public static toOrm(domain: GameRoom): GameRoomOrmEntity {
    const orm = new GameRoomOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.pcStation = domain.stations.map((pcDomain) =>
      PcStationMapper.toOrm(pcDomain),
    );
    orm.type = domain.type;

    return orm;
  }

  public static toDomain(orm: GameRoomOrmEntity): GameRoom {
    return GameRoom.create(orm.id, {
      name: orm.name,
      type: orm.type,
      stations: orm.pcStation.map((pcOrm) => PcStationMapper.toDomain(pcOrm)),
    });
  }
}
