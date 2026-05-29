import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IMedicoEfetivoRepository,
  MEDICO_EFETIVO_REPOSITORY,
} from 'src/domain/ports/medico-efetivo.repository';
import { MedicoEfetivo } from 'src/domain/entities/MedicoEfetivo.entity';
import type { UpdateMedicoEfetivoDto } from 'src/application/dto/MedicoEfetivo/update-medico-efetivo.dto';
import { CreateMedicoEfetivoDto } from 'src/application/dto/MedicoEfetivo/create-medico-efetivo.dto';
import { MedicoEfetivoMapper } from 'src/application/mapper/MedicoEfetivo.mapper';

@Injectable()
export class CreateMedicoEfetivoUseCase {
  constructor(
    @Inject(MEDICO_EFETIVO_REPOSITORY)
    private readonly repository: IMedicoEfetivoRepository,
  ) {}

  async execute(dto: CreateMedicoEfetivoDto): Promise<MedicoEfetivo> {
    const efetivo = MedicoEfetivoMapper.toDomain(dto);
    return this.repository.create(efetivo);
  }
}
