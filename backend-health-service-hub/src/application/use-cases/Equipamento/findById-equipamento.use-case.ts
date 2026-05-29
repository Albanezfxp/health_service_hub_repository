import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  EQUIPAMENTO_REPOSITORY,
  IEquipamentoRepository,
} from 'src/domain/ports/equipamento.repository';
import { Equipamento } from 'src/domain/entities/Equipamento.entity';

@Injectable()
export class FindByIdEquipamentoUseCase {
  constructor(
    @Inject(EQUIPAMENTO_REPOSITORY)
    private readonly repository: IEquipamentoRepository,
  ) {}

  async execute(id: string): Promise<Equipamento> {
    const equipamento = await this.repository.findById(id);

    if (!equipamento) {
      throw new NotFoundException('Equipamento não encontrado');
    }

    return equipamento;
  }
}
