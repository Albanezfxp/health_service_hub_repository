import { Inject, Injectable } from '@nestjs/common';
import { Ambulatorio } from 'src/domain/entities/Ambulatorio.entity';
import {
  AMBULATORIO_REPOSITORY,
  IAmbulatorioRepository,
} from 'src/domain/ports/ambulatorio.repository';

@Injectable()
export class FindByIdAmbulatorioUseCase {
  constructor(
    @Inject(AMBULATORIO_REPOSITORY)
    private readonly repository: IAmbulatorioRepository,
  ) {}

  execute(id: string): Promise<Ambulatorio> {
    const ambulatorio = this.repository.findById(id);
    return ambulatorio;
  }
}
