import { GameRoom } from '../../domain/entities/game-room.entity';
import { RoomType } from '../../domain/enums/room-type.enum';

export abstract class IGameRoomRepository {
  abstract save(room: GameRoom): Promise<void>;

  abstract findByid(id: string): Promise<GameRoom | null>;

  abstract findAll(
    name?: string,
    type?: RoomType,
    stations_ids?: string[],
  ): Promise<GameRoom[]>;

  abstract delete(id: string): Promise<void>;
  // abstract findByType(type: RoomType): Promise<GameRoom[]>;
}
