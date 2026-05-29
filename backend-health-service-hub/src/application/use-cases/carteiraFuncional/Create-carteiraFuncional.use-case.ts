import { Inject, Injectable } from '@nestjs/common';
import { CarteiraFuncionalCreateDto } from 'src/application/dto/CarteiraFuncional/CarteiraFuncional_create.dto';
import { CarteiraFuncional } from 'src/domain/entities/CarteiraFuncional.entity';

import {
  CARTEIRAFUNCIONAL_REPOSITORY,
  ICarteiraFuncionalRepository,
} from 'src/domain/ports/CarteiraFuncional.repository';

@Injectable()
export class CreateCarteiraFuncionalUseCase {
  constructor(
    @Inject(CARTEIRAFUNCIONAL_REPOSITORY)
    private readonly repository: ICarteiraFuncionalRepository,
  ) {}

  async execute(
    carteirFuncional: CarteiraFuncionalCreateDto,
  ): Promise<CarteiraFuncional> {
    const entity = new CarteiraFuncional(
      carteirFuncional.crm,
      carteirFuncional.dataExpedicao,
      carteirFuncional.orgaoExpedidor,
      carteirFuncional.idMedico,
    );

    return await this.repository.create(entity);
  }
}
