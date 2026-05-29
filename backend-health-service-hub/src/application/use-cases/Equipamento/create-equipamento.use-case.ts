import { Inject, Injectable } from '@nestjs/common';
import {
  EQUIPAMENTO_REPOSITORY,
  IEquipamentoRepository,
} from 'src/domain/ports/equipamento.repository';
import { Equipamento } from 'src/domain/entities/Equipamento.entity';
import { EquipamentoMapper } from 'src/application/mapper/Equipamento.mapper';
import type { CreateEquipamentoDto } from 'src/application/dto/Equipamento/create-equipamento.dto';

@Injectable()
export class CreateEquipamentoUseCase {
  constructor(
    @Inject(EQUIPAMENTO_REPOSITORY)
    private readonly repository: IEquipamentoRepository,
  ) {}

  async execute(dto: CreateEquipamentoDto): Promise<Equipamento> {
    const equipamento = EquipamentoMapper.toDomain(dto);
    return this.repository.create(equipamento);
  }
}
