import { Inject, Injectable } from '@nestjs/common';
import {
  EQUIPAMENTO_REPOSITORY,
  IEquipamentoRepository,
} from 'src/domain/ports/equipamento.repository';
import { Equipamento } from 'src/domain/entities/Equipamento.entity';

@Injectable()
export class FindAllEquipamentoUseCase {
  constructor(
    @Inject(EQUIPAMENTO_REPOSITORY)
    private readonly repository: IEquipamentoRepository,
  ) {}

  async execute(): Promise<Equipamento[]> {
    return this.repository.findAll();
  }
}
