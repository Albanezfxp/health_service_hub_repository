import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AmbulatorioUpdateDto } from 'src/application/dto/Ambulatorio/Ambulatorio-update.dto';
import { Ambulatorio } from 'src/domain/entities/Ambulatorio.entity';
import {
  AMBULATORIO_REPOSITORY,
  IAmbulatorioRepository,
} from 'src/domain/ports/ambulatorio.repository';

@Injectable()
export class UpdateAmbulatorioUseCase {
  constructor(
    @Inject(AMBULATORIO_REPOSITORY)
    private readonly repository: IAmbulatorioRepository,
  ) {}

  async execute(id: string, dto: AmbulatorioUpdateDto): Promise<Ambulatorio> {
    const ambulatorioExistente = await this.repository.findById(id);

    if (!ambulatorioExistente) {
      throw new NotFoundException('Ambulatorio não encontrado');
    }

    const entity = new Ambulatorio(
      dto.nome ?? ambulatorioExistente.nome,
      dto.rua ?? ambulatorioExistente.rua,
      dto.cidade ?? ambulatorioExistente.cidade,
      dto.estado ?? ambulatorioExistente.estado,
      dto.idHospital ?? ambulatorioExistente.idHospital,
      {
        sigla: dto.sigla ?? ambulatorioExistente.sigla,
        bairro: dto.bairro ?? ambulatorioExistente.bairro,
        numero: dto.numero ?? ambulatorioExistente.numero,
        cep: dto.cep ?? ambulatorioExistente.cep,
        id: id,
      },
    );

    return this.repository.update(id, entity);
  }
}
