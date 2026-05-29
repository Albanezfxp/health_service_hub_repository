export const EQUIPAMENTO_REPOSITORY = 'EQUIPAMENTO_REPOSITORY';
import { Equipamento } from '../entities/Equipamento.entity';

export abstract class IEquipamentoRepository {
  abstract findAll(): Promise<Equipamento[]>;
  abstract findById(id: string): Promise<Equipamento | null>;
  abstract create(equipamento: Equipamento): Promise<Equipamento>;
  abstract update(id: string, equipamento: Equipamento): Promise<Equipamento>;
  abstract delete(id: string): Promise<void>;
}
