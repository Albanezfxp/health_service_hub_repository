import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class CreateMedicoEfetivoDto {
  @IsUUID()
  medicoId!: string;

  @IsDateString()
  dataAdmissao!: string;

  @IsOptional()
  @IsUUID()
  supervisorId?: string;
}
