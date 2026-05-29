// src/application/dto/MedicoLotacao/create-medico-lotacao.dto.ts

import { IsDateString, IsUUID, IsOptional } from 'class-validator';

export class CreateMedicoLotacaoDto {
  @IsDateString()
  dataInicio!: string;

  @IsOptional()
  @IsDateString()
  dataFim?: string;

  @IsUUID()
  medicoId!: string;

  @IsUUID()
  ambulatorioId!: string;
}
