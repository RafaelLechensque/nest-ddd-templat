import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class PartialUpdatePcDto {
  @IsString() @IsOptional() cpu?: string;
  @IsString() @IsOptional() gpu?: string;
  @IsNumber() @IsOptional() @Min(0) ram?: number;
  @IsNumber() @IsOptional() @Min(0) storage?: number;
  @IsBoolean() @IsOptional() isUnderMaintenance?: boolean;
}

// 2. DTO para PUT (Completo) - Todos obrigatórios
export class FullUpdatePcDto {
  @IsString() @IsNotEmpty() declare cpu: string;
  @IsString() @IsNotEmpty() declare gpu: string;
  @IsNumber() @IsNotEmpty() @Min(0) declare ram: number;
  @IsNumber() @IsNotEmpty() @Min(0) declare storage: number;
  // @IsBoolean() @IsNotEmpty() declare isUnderMaintenance: boolean;
}

export class OnlyMaintenanceUpdateDto {
  @IsBoolean() @IsNotEmpty() declare isUnderMaintenance: boolean;
}
