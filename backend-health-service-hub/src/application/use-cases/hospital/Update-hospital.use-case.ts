import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Hospital } from 'src/domain/entities/Hospital.entity';
import type { HospitalUpdateDto } from 'src/application/dto/Hospital/Hospital_update.dto';
import {
  HOSPITAL_REPOSITORY,
  IhospitalRepository,
} from 'src/domain/ports/hospital.repository';

@Injectable()
export class UpdateHospitalUseCase {
  constructor(
    @Inject(HOSPITAL_REPOSITORY)
    private readonly repository: IhospitalRepository,
  ) {}
  async execute(id: string, dto: HospitalUpdateDto): Promise<Hospital> {
    const hospitalExistente = await this.repository.findById(id);

    if (!hospitalExistente) {
      throw new NotFoundException('Hospital não encontrado');
    }

    const hospitalAtualizado = new Hospital(
      dto.nome || hospitalExistente.nome,
      dto.endereco || hospitalExistente.endereco,
      dto.capacidade !== undefined
        ? dto.capacidade
        : hospitalExistente.capacidade,
      hospitalExistente.id,
      hospitalExistente.criadoEm,
      hospitalExistente.atualizadoEm,
    );

    return this.repository.update(id, hospitalAtualizado);
  }
}
