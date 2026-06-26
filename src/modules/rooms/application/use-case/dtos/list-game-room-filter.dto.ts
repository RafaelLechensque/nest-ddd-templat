import { RoomType } from '../../../domain/enums/room-type.enum';

export interface ListGameRoomFilterInput {
  name?: string;
  type?: RoomType;
  stations_ids?: string[];
}
