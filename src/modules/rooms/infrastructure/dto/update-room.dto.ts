import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RoomType } from '../../domain/enums/room-type.enum';

export class UpdateGameRoomDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(RoomType)
  @IsOptional()
  type?: RoomType;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  stations_ids?: string[];
}
