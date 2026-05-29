import { Inject, Injectable } from '@nestjs/common';
import { Medico } from 'src/domain/entities/Medico.entity';
import {
  IMedicoRepository,
  MEDICO_REPOSITORY,
} from 'src/domain/ports/medico.repository';

@Injectable()
export class FindAllMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly repository: IMedicoRepository,
  ) {}
  async execute(): Promise<Medico[]> {
    return await this.repository.findAll();
  }
}
