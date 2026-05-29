import { Inject, Injectable } from '@nestjs/common';
import { UpdateMedicoLotacaoDto } from 'src/application/dto/MedicoLotacao/update-medico-lotacao.dto';
import { MedicoLotacao } from 'src/domain/entities/MedicoLotacao.entity';
import { MEDICO_LOTACAO_REPOSITORY } from 'src/domain/ports/medico-lotacao.repository';
import type { IMedicoLotacaoRepository } from 'src/domain/ports/medico-lotacao.repository';

@Injectable()
export class UpdateMedicoLotacaoUseCase {
  constructor(
    @Inject(MEDICO_LOTACAO_REPOSITORY)
    private readonly repository: IMedicoLotacaoRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateMedicoLotacaoDto,
  ): Promise<MedicoLotacao> {
    const lotacao = new MedicoLotacao(
      new Date(dto.dataInicio || new Date()),
      '',
      '',
      id,
      dto.dataFim ? new Date(dto.dataFim) : undefined,
    );
    return this.repository.update(id, lotacao);
  }
}
