import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IMedicoEfetivoRepository,
  MEDICO_EFETIVO_REPOSITORY,
} from 'src/domain/ports/medico-efetivo.repository';
import { MedicoEfetivo } from 'src/domain/entities/MedicoEfetivo.entity';
import type { UpdateMedicoEfetivoDto } from 'src/application/dto/MedicoEfetivo/update-medico-efetivo.dto';

@Injectable()
export class DeleteMedicoEfetivoUseCase {
  constructor(
    @Inject(MEDICO_EFETIVO_REPOSITORY)
    private readonly repository: IMedicoEfetivoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
