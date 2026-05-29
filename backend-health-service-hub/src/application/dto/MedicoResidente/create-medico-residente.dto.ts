import {
  IsUUID,
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateMedicoResidenteDto {
  @IsUUID()
  medicoId!: string;

  @IsOptional()
  @IsNumber()
  valorBolsa?: number;

  @IsOptional()
  @IsString()
  orgaoPagador?: string;

  @IsOptional()
  @IsDateString()
  dataInicioResidencia?: string;
}
