// src/domain/entities/RequisicaoEquipamento.entity.ts

import { StatusRequisicao } from '@prisma/client';

export class RequisicaoEquipamento {
  id?: string;
  numeroRequisicao: string;
  dataRequisicao: Date;
  quantidade: number;
  status: StatusRequisicao;
  dataEntrega?: Date;
  auditoriaId: string;
  equipamentoId: string;
  criadoEm?: Date;
  atualizadoEm?: Date;

  constructor(
    numeroRequisicao: string,
    dataRequisicao: Date,
    quantidade: number,
    auditoriaId: string,
    equipamentoId: string,
    status: StatusRequisicao = 'Solicitado' as StatusRequisicao,
    dataEntrega?: Date,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
  ) {
    if (!numeroRequisicao) throw new Error('numeroRequisicao é obrigatório');
    if (!dataRequisicao) throw new Error('dataRequisicao é obrigatória');
    if (!quantidade || quantidade <= 0)
      throw new Error('Quantidade deve ser maior que 0');
    if (!auditoriaId) throw new Error('auditoriaId é obrigatório');
    if (!equipamentoId) throw new Error('equipamentoId é obrigatório');

    this.id = id;
    this.numeroRequisicao = numeroRequisicao;
    this.dataRequisicao = dataRequisicao;
    this.quantidade = quantidade;
    this.status = status;
    this.dataEntrega = dataEntrega;
    this.auditoriaId = auditoriaId;
    this.equipamentoId = equipamentoId;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
