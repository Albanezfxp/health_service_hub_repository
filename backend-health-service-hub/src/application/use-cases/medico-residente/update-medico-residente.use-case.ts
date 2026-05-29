import { Inject, Injectable } from '@nestjs/common';
import { MEDICO_RESIDENTE_REPOSITORY } from 'src/domain/ports/medico-residente.repository';
import type { IMedicoResidenteRepository } from 'src/domain/ports/medico-residente.repository';
import { MedicoResidente } from 'src/domain/entities/MedicoResidente.entity';
import type { UpdateMedicoResidenteDto } from 'src/application/dto/MedicoResidente/update-medico-residente.dto';

@Injectable()
export class UpdateMedicoResidenteUseCase {
  constructor(
    @Inject(MEDICO_RESIDENTE_REPOSITORY)
    private readonly repository: IMedicoResidenteRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateMedicoResidenteDto,
  ): Promise<MedicoResidente> {
    const residente = new MedicoResidente(
      '',
      dto.valorBolsa,
      dto.orgaoPagador,
      dto.dataInicioResidencia ? new Date(dto.dataInicioResidencia) : undefined,
      id,
    );
    return this.repository.update(id, residente);
  }
}
