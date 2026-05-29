import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MEDICO_RESIDENTE_REPOSITORY } from 'src/domain/ports/medico-residente.repository';
import type { IMedicoResidenteRepository } from 'src/domain/ports/medico-residente.repository';
import { MedicoResidente } from 'src/domain/entities/MedicoResidente.entity';

@Injectable()
export class FindByIdMedicoResidenteUseCase {
  constructor(
    @Inject(MEDICO_RESIDENTE_REPOSITORY)
    private readonly repository: IMedicoResidenteRepository,
  ) {}

  async execute(id: string): Promise<MedicoResidente> {
    const residente = await this.repository.findById(id);

    if (!residente) {
      throw new NotFoundException('Médico Residente não encontrado');
    }

    return residente;
  }
}
