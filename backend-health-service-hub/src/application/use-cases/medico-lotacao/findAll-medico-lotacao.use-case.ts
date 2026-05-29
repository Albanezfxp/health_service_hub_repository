import { Inject, Injectable } from '@nestjs/common';
import { MedicoLotacao } from 'src/domain/entities/MedicoLotacao.entity';
import { MEDICO_LOTACAO_REPOSITORY } from 'src/domain/ports/medico-lotacao.repository';
import type { IMedicoLotacaoRepository } from 'src/domain/ports/medico-lotacao.repository';

@Injectable()
export class FindAllMedicoLotacaoUseCase {
  constructor(
    @Inject(MEDICO_LOTACAO_REPOSITORY)
    private readonly repository: IMedicoLotacaoRepository,
  ) {}

  async execute(): Promise<MedicoLotacao[]> {
    return this.repository.findAll();
  }
}
