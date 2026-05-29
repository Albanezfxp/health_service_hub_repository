import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IMedicoEfetivoRepository,
  MEDICO_EFETIVO_REPOSITORY,
} from 'src/domain/ports/medico-efetivo.repository';
import { MedicoEfetivo } from 'src/domain/entities/MedicoEfetivo.entity';
import type { UpdateMedicoEfetivoDto } from 'src/application/dto/MedicoEfetivo/update-medico-efetivo.dto';
@Injectable()
export class UpdateMedicoEfetivoUseCase {
  constructor(
    @Inject(MEDICO_EFETIVO_REPOSITORY)
    private readonly repository: IMedicoEfetivoRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateMedicoEfetivoDto,
  ): Promise<MedicoEfetivo> {
    const efetivo = new MedicoEfetivo(
      dto.dataAdmissao ? new Date(dto.dataAdmissao) : new Date(),
      '',
      dto.supervisorId,
      id,
    );
    return this.repository.update(id, efetivo);
  }
}
