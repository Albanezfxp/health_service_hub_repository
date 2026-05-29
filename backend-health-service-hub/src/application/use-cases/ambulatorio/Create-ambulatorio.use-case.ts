import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AmbulatorioCreateDto } from 'src/application/dto/Ambulatorio/Ambulatorio-create.dto';
import { Ambulatorio } from 'src/domain/entities/Ambulatorio.entity';
import {
  AMBULATORIO_REPOSITORY,
  IAmbulatorioRepository,
} from 'src/domain/ports/ambulatorio.repository';

@Injectable()
export class CreateAmbulatorioUseCase {
  constructor(
    @Inject(AMBULATORIO_REPOSITORY)
    private readonly repository: IAmbulatorioRepository,
  ) {}

  execute(dto: AmbulatorioCreateDto): Promise<Ambulatorio> {
    const entity = new Ambulatorio(
      dto.nome,
      dto.rua,
      dto.cidade,
      dto.estado,
      dto.idHospital,
      {
        sigla: dto.sigla,
        bairro: dto.bairro,
        numero: dto.numero,
        cep: dto.cep,
      },
    );

    return this.repository.create(entity);
  }
}
