export const AMBULATORIO_REPOSITORY = 'AMBULATORIO_REPOSITORY';
import { Ambulatorio } from '../entities/Ambulatorio.entity';

export abstract class IAmbulatorioRepository {
  abstract findAll(): Promise<Ambulatorio[]>;
  abstract findById(id: string): Promise<Ambulatorio>;
  abstract create(ambulatorio: Ambulatorio): Promise<Ambulatorio>;
  abstract update(id: string, ambulatorio: Ambulatorio): Promise<Ambulatorio>;
  abstract delete(id: string): Promise<void>;
}
