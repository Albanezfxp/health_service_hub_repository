import { Inject, Injectable } from '@nestjs/common';
import { MEDICO_RESIDENTE_REPOSITORY } from 'src/domain/ports/medico-residente.repository';
import type { IMedicoResidenteRepository } from 'src/domain/ports/medico-residente.repository';
import { MedicoResidente } from 'src/domain/entities/MedicoResidente.entity';

@Injectable()
export class FindAllMedicoResidenteUseCase {
  constructor(
    @Inject(MEDICO_RESIDENTE_REPOSITORY)
    private readonly repository: IMedicoResidenteRepository,
  ) {}

  async execute(): Promise<MedicoResidente[]> {
    return this.repository.findAll();
  }
}
