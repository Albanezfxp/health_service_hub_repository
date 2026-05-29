import { Inject, Injectable } from '@nestjs/common';
import { CarteiraFuncional } from 'src/domain/entities/CarteiraFuncional.entity';
import {
  CARTEIRAFUNCIONAL_REPOSITORY,
  ICarteiraFuncionalRepository,
} from 'src/domain/ports/CarteiraFuncional.repository';

@Injectable()
export class FindAllCarteiraFuncionalUseCase {
  constructor(
    @Inject(CARTEIRAFUNCIONAL_REPOSITORY)
    private readonly repository: ICarteiraFuncionalRepository,
  ) {}
  async execute(): Promise<CarteiraFuncional[]> {
    return await this.repository.findAll();
  }
}
