import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IMedicoEfetivoRepository,
  MEDICO_EFETIVO_REPOSITORY,
} from 'src/domain/ports/medico-efetivo.repository';
import { MedicoEfetivo } from 'src/domain/entities/MedicoEfetivo.entity';
import type { UpdateMedicoEfetivoDto } from 'src/application/dto/MedicoEfetivo/update-medico-efetivo.dto';

@Injectable()
export class FindAllMedicoEfetivoUseCase {
  constructor(
    @Inject(MEDICO_EFETIVO_REPOSITORY)
    private readonly repository: IMedicoEfetivoRepository,
  ) {}

  async execute(): Promise<MedicoEfetivo[]> {
    return this.repository.findAll();
  }
}
