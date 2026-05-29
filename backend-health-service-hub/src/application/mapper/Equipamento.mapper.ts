import { Equipamento } from 'src/domain/entities/Equipamento.entity';
import { CreateEquipamentoDto } from '../dto/Equipamento/create-equipamento.dto';

export class EquipamentoMapper {
  static toDomain(dto: CreateEquipamentoDto): Equipamento {
    return new Equipamento(dto.nome, dto.fabricante, dto.cor);
  }

  static toResponse(equipamento: Equipamento) {
    return {
      id: equipamento.id,
      nome: equipamento.nome,
      fabricante: equipamento.fabricante || null,
      cor: equipamento.cor || null,
      criadoEm: equipamento.criadoEm,
      atualizadoEm: equipamento.atualizadoEm,
    };
  }

  static toResponseList(equipamentos: Equipamento[]) {
    return equipamentos.map((e) => this.toResponse(e));
  }
}
