import { Inject, Injectable } from '@nestjs/common';
import { MEDICO_RESIDENTE_REPOSITORY } from 'src/domain/ports/medico-residente.repository';
import type { IMedicoResidenteRepository } from 'src/domain/ports/medico-residente.repository';

@Injectable()
export class DeleteMedicoResidenteUseCase {
  constructor(
    @Inject(MEDICO_RESIDENTE_REPOSITORY)
    private readonly repository: IMedicoResidenteRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
