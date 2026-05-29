import { Inject, Injectable } from '@nestjs/common';
import { MEDICO_LOTACAO_REPOSITORY } from 'src/domain/ports/medico-lotacao.repository';
import type { IMedicoLotacaoRepository } from 'src/domain/ports/medico-lotacao.repository';

@Injectable()
export class DeleteMedicoLotacaoUseCase {
  constructor(
    @Inject(MEDICO_LOTACAO_REPOSITORY)
    private readonly repository: IMedicoLotacaoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
