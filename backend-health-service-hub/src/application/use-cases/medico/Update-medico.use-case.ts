import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Medico } from 'src/domain/entities/Medico.entity';
import type { MedicoUpdateDto } from 'src/application/dto/Medico/Medico_update.dto';
import {
  IMedicoRepository,
  MEDICO_REPOSITORY,
} from 'src/domain/ports/medico.repository';

@Injectable()
export class UpdateMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly repository: IMedicoRepository,
  ) {}
  async execute(id: string, dto: MedicoUpdateDto): Promise<Medico> {
    const medicoExistente = await this.repository.findById(id);

    if (!medicoExistente) {
      throw new NotFoundException('Medico não encontrado');
    }

    const MedicoAtualizado = new Medico(
      dto.matricula || medicoExistente.matricula,
      dto.nome || medicoExistente.nome,
      dto.telefone || medicoExistente.telefone,
      dto.email || medicoExistente.email,
      dto.tipo || medicoExistente.tipo,
    );

    return this.repository.update(id, MedicoAtualizado);
  }
}
