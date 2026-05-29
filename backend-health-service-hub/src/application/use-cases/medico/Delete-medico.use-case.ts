import { Inject, Injectable } from '@nestjs/common';
import {
  IMedicoRepository,
  MEDICO_REPOSITORY,
} from 'src/domain/ports/medico.repository';

@Injectable()
export class DeleteMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly repository: IMedicoRepository,
  ) {}

  async execute(id: string): Promise<void | null> {
    const MedicoExist = await this.repository.findById(id);
    if (!MedicoExist) {
      throw new Error('Medico não encontrado');
    }

    await this.repository.delete(String(id));
  }
}
