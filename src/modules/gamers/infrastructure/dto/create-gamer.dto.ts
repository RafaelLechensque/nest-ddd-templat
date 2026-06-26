import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MembershipType } from '../../domain/enums/membership.enum';

export class CreateGamerDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsEnum(MembershipType)
  membership!: MembershipType;
}
