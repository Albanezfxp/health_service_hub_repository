import { RequisicaoEquipamento } from 'src/domain/entities/RequisicaoEquipamento.entity';
import type { CreateRequisicaoEquipamentoDto } from '../dto/RequisicaoEquipamento/create-requisicao-equipamento.dto';
import { StatusRequisicao } from '@prisma/client';

export class RequisicaoEquipamentoMapper {
  static toDomain(dto: CreateRequisicaoEquipamentoDto): RequisicaoEquipamento {
    return new RequisicaoEquipamento(
      dto.numeroRequisicao,
      new Date(dto.dataRequisicao),
      dto.quantidade,
      dto.auditoriaId,
      dto.equipamentoId,
      'Solicitado' as StatusRequisicao,
    );
  }

  static toResponse(requisicao: RequisicaoEquipamento) {
    return {
      id: requisicao.id,
      numeroRequisicao: requisicao.numeroRequisicao,
      dataRequisicao: requisicao.dataRequisicao,
      quantidade: requisicao.quantidade,
      status: requisicao.status,
      dataEntrega: requisicao.dataEntrega || null,
      auditoriaId: requisicao.auditoriaId,
      equipamentoId: requisicao.equipamentoId,
      criadoEm: requisicao.criadoEm,
      atualizadoEm: requisicao.atualizadoEm,
    };
  }

  static toResponseList(requisicoes: RequisicaoEquipamento[]) {
    return requisicoes.map((r) => this.toResponse(r));
  }
}
