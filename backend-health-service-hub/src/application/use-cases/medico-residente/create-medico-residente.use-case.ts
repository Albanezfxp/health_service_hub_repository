import { Inject, Injectable } from '@nestjs/common';
import { MEDICO_RESIDENTE_REPOSITORY } from 'src/domain/ports/medico-residente.repository';
import type { IMedicoResidenteRepository } from 'src/domain/ports/medico-residente.repository';
import { MedicoResidente } from 'src/domain/entities/MedicoResidente.entity';
import { MedicoResidenteMapper } from 'src/application/mapper/MedicoResidente.mapper';
import type { CreateMedicoResidenteDto } from 'src/application/dto/MedicoResidente/create-medico-residente.dto';

@Injectable()
export class CreateMedicoResidenteUseCase {
  constructor(
    @Inject(MEDICO_RESIDENTE_REPOSITORY)
    private readonly repository: IMedicoResidenteRepository,
  ) {}

  async execute(dto: CreateMedicoResidenteDto): Promise<MedicoResidente> {
    const residente = MedicoResidenteMapper.toDomain(dto);
    return this.repository.create(residente);
  }
}
