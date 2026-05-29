export const MEDICO_EFETIVO_REPOSITORY = 'MEDICO_EFETIVO_REPOSITORY';
import { MedicoEfetivo } from '../entities/MedicoEfetivo.entity';

export abstract class IMedicoEfetivoRepository {
  abstract findAll(): Promise<MedicoEfetivo[]>;
  abstract findById(id: string): Promise<MedicoEfetivo | null>;
  abstract findByMedicoId(medicoId: string): Promise<MedicoEfetivo | null>;
  abstract create(medicoEfetivo: MedicoEfetivo): Promise<MedicoEfetivo>;
  abstract update(
    id: string,
    medicoEfetivo: MedicoEfetivo,
  ): Promise<MedicoEfetivo>;
  abstract delete(id: string): Promise<void>;
}
