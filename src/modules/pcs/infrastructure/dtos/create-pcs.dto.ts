import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreatePcStationDto {
  //   @IsNumber({}, { message: 'O número da estação deve ser um número.' })
  //   number!: number;
  @IsNotEmpty({ message: 'A CPU não pode ser vazia.' })
  @IsString({ message: 'A CPU deve ser uma string.' })
  cpu!: string;

  @IsNotEmpty({ message: 'A GPU não pode ser vazia.' })
  @IsString({ message: 'A GPU deve ser uma string.' })
  gpu!: string;

  @IsNotEmpty({ message: 'A RAM não pode ser vazia.' })
  @IsNumber({}, { message: 'A RAM deve ser um número.' })
  ram!: number;

  @IsNotEmpty({ message: 'O armazenamento não pode ser vazio.' })
  @IsNumber({}, { message: 'O armazenamento deve ser um número.' })
  storage!: number;
}
