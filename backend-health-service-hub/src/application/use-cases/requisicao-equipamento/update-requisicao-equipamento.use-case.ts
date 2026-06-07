// src/application/use-cases/requisicao-equipamento/update-requisicao-equipamento.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { REQUISICAO_EQUIPAMENTO_REPOSITORY } from 'src/domain/ports/requisicao-equipamento.repository';
import type { IRequisicaoEquipamentoRepository } from 'src/domain/ports/requisicao-equipamento.repository';
import { RequisicaoEquipamento } from 'src/domain/entities/RequisicaoEquipamento.entity';
import type { UpdateRequisicaoEquipamentoDto } from 'src/application/dto/RequisicaoEquipamento/update-requisicao-equipamento.dto';
import { StatusRequisicao } from '@prisma/client';

@Injectable()
export class UpdateRequisicaoEquipamentoUseCase {
  constructor(
    @Inject(REQUISICAO_EQUIPAMENTO_REPOSITORY)
    private readonly repository: IRequisicaoEquipamentoRepository,
  ) {}

  async execute(
  id: string,
  dto: UpdateRequisicaoEquipamentoDto,
): Promise<RequisicaoEquipamento> {
  const atual = await this.repository.findById(id);

  if (!atual) {
    throw new Error('Requisição não encontrada');
  }

  const requisicao = new RequisicaoEquipamento(
    atual.numeroRequisicao,
    atual.dataRequisicao,
    dto.quantidade ?? atual.quantidade,
    atual.auditoriaId,
    atual.equipamentoId,
    dto.status ?? atual.status,
    dto.dataEntrega
      ? new Date(dto.dataEntrega)
      : atual.dataEntrega,
    id,
  );

  return this.repository.update(id, requisicao);
}
}
