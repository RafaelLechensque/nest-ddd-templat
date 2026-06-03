import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsISO8601,
  IsUUID,
} from 'class-validator';
import { BookingType } from '../../domain/enums/booking-type.enum';

export class CreateBookingDto {
  @IsUUID('4', { message: 'O ID do gamer deve ser un UUID válido.' })
  gamerId!: string;

  @IsUUID('4', { message: 'O ID da sala deve ser um UUID válido.' })
  roomId!: string;

  @IsArray({ message: 'Os IDs das estações devem ser um array de textos.' })
  @ArrayNotEmpty({ message: 'Você deve selecionar pelo menos um computador.' })
  stationIds!: string[];

  @IsISO8601(
    {},
    {
      message:
        'A data de início deve estar no formato ISO8601 (ex: 2026-06-10T14:00:00Z).',
    },
  )
  startTime!: string;

  @IsISO8601(
    {},
    {
      message: 'A data de término deve estar no formato ISO8601 .',
    },
  )
  endTime!: string;

  @IsEnum(BookingType, {
    message:
      'O tipo de reserva deve ser 1 (SOLO), 2 (DUO), 5 (TEAM) ou 10 (TOURNAMENT).',
  })
  type!: BookingType;
}
