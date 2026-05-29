import { Inject, Injectable } from '@nestjs/common';
import {
  EQUIPAMENTO_REPOSITORY,
  IEquipamentoRepository,
} from 'src/domain/ports/equipamento.repository';

@Injectable()
export class DeleteEquipamentoUseCase {
  constructor(
    @Inject(EQUIPAMENTO_REPOSITORY)
    private readonly repository: IEquipamentoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
