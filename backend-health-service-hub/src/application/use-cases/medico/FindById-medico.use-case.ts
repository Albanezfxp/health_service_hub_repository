import { Inject, Injectable } from '@nestjs/common';
import { Medico } from 'src/domain/entities/Medico.entity';
import {
  IMedicoRepository,
  MEDICO_REPOSITORY,
} from 'src/domain/ports/medico.repository';

@Injectable()
export class FindByIdMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly repository: IMedicoRepository,
  ) {}
  async execute(id: string): Promise<Medico> {
    const medico = await this.repository.findById(id);
    if (!medico) throw new Error('Medico não encontrado');

    return medico;
  }
}
