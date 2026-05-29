import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AMBULATORIO_REPOSITORY,
  IAmbulatorioRepository,
} from 'src/domain/ports/ambulatorio.repository';

@Injectable()
export class DeleteAmbulatorioUseCase {
  constructor(
    @Inject(AMBULATORIO_REPOSITORY)
    private readonly repository: IAmbulatorioRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const ambulatorio = await this.repository.findById(id);

    if (!ambulatorio) {
      throw new NotFoundException('Ambulatorio não encontrado');
    }

    await this.repository.delete(id);
  }
}
