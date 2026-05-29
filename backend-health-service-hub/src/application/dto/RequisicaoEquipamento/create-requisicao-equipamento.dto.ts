// src/application/dto/RequisicaoEquipamento/create-requisicao-equipamento.dto.ts

import {
  IsNumber,
  IsUUID,
  IsPositive,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateRequisicaoEquipamentoDto {
  @IsString()
  numeroRequisicao!: string;

  @IsDateString()
  dataRequisicao!: string;

  @IsNumber()
  @IsPositive()
  quantidade!: number;

  @IsUUID()
  auditoriaId!: string;

  @IsUUID()
  equipamentoId!: string;
}
