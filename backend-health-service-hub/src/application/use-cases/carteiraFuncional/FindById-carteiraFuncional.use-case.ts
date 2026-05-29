import { Inject, Injectable } from '@nestjs/common';
import { CarteiraFuncional } from 'src/domain/entities/CarteiraFuncional.entity';
import {
  CARTEIRAFUNCIONAL_REPOSITORY,
  ICarteiraFuncionalRepository,
} from 'src/domain/ports/CarteiraFuncional.repository';

@Injectable()
export class FindByIdCarteiraFuncionalUseCase {
  constructor(
    @Inject(CARTEIRAFUNCIONAL_REPOSITORY)
    private readonly repository: ICarteiraFuncionalRepository,
  ) {}
  async execute(id: string): Promise<CarteiraFuncional> {
    const carteiraFuncional = await this.repository.findById(id);
    if (!carteiraFuncional)
      throw new Error('Carteira Funcional não encontrado');

    return carteiraFuncional;
  }
}
