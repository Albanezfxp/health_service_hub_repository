import { Inject, Injectable } from '@nestjs/common';
import { MEDICO_LOTACAO_REPOSITORY } from 'src/domain/ports/medico-lotacao.repository';
import type { IMedicoLotacaoRepository } from 'src/domain/ports/medico-lotacao.repository';
import { MedicoLotacao } from 'src/domain/entities/MedicoLotacao.entity';
import { MedicoLotacaoMapper } from 'src/application/mapper/MedicoLotacao.mapper';
import type { CreateMedicoLotacaoDto } from 'src/application/dto/MedicoLotacao/create-medico-lotacao.dto';

@Injectable()
export class CreateMedicoLotacaoUseCase {
  constructor(
    @Inject(MEDICO_LOTACAO_REPOSITORY)
    private readonly repository: IMedicoLotacaoRepository,
  ) {}

  async execute(dto: CreateMedicoLotacaoDto): Promise<MedicoLotacao> {
    const lotacao = MedicoLotacaoMapper.toDomain(dto);
    return this.repository.create(lotacao);
  }
}
