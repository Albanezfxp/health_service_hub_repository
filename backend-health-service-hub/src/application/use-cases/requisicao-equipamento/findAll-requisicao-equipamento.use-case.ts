import { Inject, Injectable } from '@nestjs/common';
import { REQUISICAO_EQUIPAMENTO_REPOSITORY } from 'src/domain/ports/requisicao-equipamento.repository';
import type { IRequisicaoEquipamentoRepository } from 'src/domain/ports/requisicao-equipamento.repository';
import { RequisicaoEquipamento } from 'src/domain/entities/RequisicaoEquipamento.entity';

@Injectable()
export class FindAllRequisicaoEquipamentoUseCase {
  constructor(
    @Inject(REQUISICAO_EQUIPAMENTO_REPOSITORY)
    private readonly repository: IRequisicaoEquipamentoRepository,
  ) {}

  async execute(): Promise<RequisicaoEquipamento[]> {
    return this.repository.findAll();
  }
}
