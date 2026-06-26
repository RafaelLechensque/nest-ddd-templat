import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RoomType } from '../../domain/enums/room-type.enum';

export class CreateGameRoomDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEnum(RoomType)
  type!: RoomType;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  stations_ids!: string[];
}
