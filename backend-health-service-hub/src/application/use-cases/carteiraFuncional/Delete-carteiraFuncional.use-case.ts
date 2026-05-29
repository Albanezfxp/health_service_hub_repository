import { Inject, Injectable } from '@nestjs/common';
import {
  CARTEIRAFUNCIONAL_REPOSITORY,
  ICarteiraFuncionalRepository,
} from 'src/domain/ports/CarteiraFuncional.repository';

@Injectable()
export class DeleteCarteiraFuncionalUseCase {
  constructor(
    @Inject(CARTEIRAFUNCIONAL_REPOSITORY)
    private readonly repository: ICarteiraFuncionalRepository,
  ) {}

  async execute(id: string): Promise<void | null> {
    const carteiraFuncionalExist = await this.repository.findById(id);
    if (!carteiraFuncionalExist) {
      throw new Error('CarteiraFuncional não encontrado');
    }

    await this.repository.delete(String(id));
  }
}
