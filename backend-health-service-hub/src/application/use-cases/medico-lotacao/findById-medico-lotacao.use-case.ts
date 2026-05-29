import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MedicoLotacao } from 'src/domain/entities/MedicoLotacao.entity';
import { MEDICO_LOTACAO_REPOSITORY } from 'src/domain/ports/medico-lotacao.repository';
import type { IMedicoLotacaoRepository } from 'src/domain/ports/medico-lotacao.repository';

@Injectable()
export class FindByIdMedicoLotacaoUseCase {
  constructor(
    @Inject(MEDICO_LOTACAO_REPOSITORY)
    private readonly repository: IMedicoLotacaoRepository,
  ) {}

  async execute(id: string): Promise<MedicoLotacao> {
    const lotacao = await this.repository.findById(id);

    if (!lotacao) {
      throw new NotFoundException('Lotação não encontrada');
    }

    return lotacao;
  }
}
