import { Inject, Injectable } from '@nestjs/common';
import {
  EQUIPAMENTO_REPOSITORY,
  IEquipamentoRepository,
} from 'src/domain/ports/equipamento.repository';
import { Equipamento } from 'src/domain/entities/Equipamento.entity';
import type { UpdateEquipamentoDto } from 'src/application/dto/Equipamento/update-equipamento.dto';

@Injectable()
export class UpdateEquipamentoUseCase {
  constructor(
    @Inject(EQUIPAMENTO_REPOSITORY)
    private readonly repository: IEquipamentoRepository,
  ) {}

  async execute(id: string, dto: UpdateEquipamentoDto): Promise<Equipamento> {
    const equipamento = new Equipamento(
      dto.nome || '',
      dto.fabricante,
      dto.cor,
      id,
    );
    return this.repository.update(id, equipamento);
  }
}
