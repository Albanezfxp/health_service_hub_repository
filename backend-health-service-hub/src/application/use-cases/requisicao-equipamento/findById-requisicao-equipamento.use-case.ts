import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUISICAO_EQUIPAMENTO_REPOSITORY } from 'src/domain/ports/requisicao-equipamento.repository';
import type { IRequisicaoEquipamentoRepository } from 'src/domain/ports/requisicao-equipamento.repository';
import { RequisicaoEquipamento } from 'src/domain/entities/RequisicaoEquipamento.entity';

@Injectable()
export class FindByIdRequisicaoEquipamentoUseCase {
  constructor(
    @Inject(REQUISICAO_EQUIPAMENTO_REPOSITORY)
    private readonly repository: IRequisicaoEquipamentoRepository,
  ) {}

  async execute(id: string): Promise<RequisicaoEquipamento> {
    const requisicao = await this.repository.findById(id);

    if (!requisicao) {
      throw new NotFoundException('Requisição não encontrada');
    }

    return requisicao;
  }
}
