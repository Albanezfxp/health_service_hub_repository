import { Inject, Injectable } from '@nestjs/common';
import { REQUISICAO_EQUIPAMENTO_REPOSITORY } from 'src/domain/ports/requisicao-equipamento.repository';
import type { IRequisicaoEquipamentoRepository } from 'src/domain/ports/requisicao-equipamento.repository';

@Injectable()
export class DeleteRequisicaoEquipamentoUseCase {
  constructor(
    @Inject(REQUISICAO_EQUIPAMENTO_REPOSITORY)
    private readonly repository: IRequisicaoEquipamentoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
