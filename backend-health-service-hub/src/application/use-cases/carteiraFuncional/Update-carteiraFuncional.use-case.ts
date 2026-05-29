import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CarteiraFuncional } from 'src/domain/entities/CarteiraFuncional.entity';
import type { CarteiraFuncionalUpdateDto } from 'src/application/dto/CarteiraFuncional/CarteiraFuncional_update.dto';
import {
  CARTEIRAFUNCIONAL_REPOSITORY,
  ICarteiraFuncionalRepository,
} from 'src/domain/ports/CarteiraFuncional.repository';

@Injectable()
export class UpdateCarteiraFuncionalUseCase {
  constructor(
    @Inject(CARTEIRAFUNCIONAL_REPOSITORY)
    private readonly repository: ICarteiraFuncionalRepository,
  ) {}
  async execute(
    id: string,
    dto: CarteiraFuncionalUpdateDto,
  ): Promise<CarteiraFuncional> {
    const carteiraFuncionalExistente = await this.repository.findById(id);

    if (!carteiraFuncionalExistente) {
      throw new NotFoundException('CarteiraFuncional não encontrado');
    }

    const carteiraFuncionalAtualizado = new CarteiraFuncional(
      dto.crm || carteiraFuncionalExistente.crm,
      dto.dataExpedicao || carteiraFuncionalExistente.dataExpedicao,
      dto.orgaoExpedidor || carteiraFuncionalExistente.orgaoExpedidor,
      dto.idMedico || carteiraFuncionalExistente.idMedico,
      carteiraFuncionalExistente.criadoEm,
      new Date(),
    );

    return this.repository.update(id, carteiraFuncionalAtualizado);
  }
}
