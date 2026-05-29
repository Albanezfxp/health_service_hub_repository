import { Inject, Injectable } from '@nestjs/common';
import { MedicoCreateDto } from 'src/application/dto/Medico/Medico_create.dto';
import { Medico } from 'src/domain/entities/Medico.entity';
import {
  IMedicoRepository,
  MEDICO_REPOSITORY,
} from 'src/domain/ports/medico.repository';

@Injectable()
export class CreateMedicoUseCase {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly repository: IMedicoRepository,
  ) {}

  async execute(medico: MedicoCreateDto): Promise<Medico> {
    const entity = new Medico(
      medico.matricula,
      medico.nome,
      medico.telefone,
      medico.email,
      medico.tipo,
    );

    return await this.repository.create(entity);
  }
}
