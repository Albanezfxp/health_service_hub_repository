// src/application/dto/RequisicaoEquipamento/update-requisicao-equipamento.dto.ts

import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { StatusRequisicao } from '@prisma/client';

export class UpdateRequisicaoEquipamentoDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantidade?: number;

  @IsOptional()
  @IsEnum(StatusRequisicao)
  status?: StatusRequisicao;

  @IsOptional()
  @IsDateString()
  dataEntrega?: string;
}
