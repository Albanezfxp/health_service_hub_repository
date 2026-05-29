import { MedicoResidente } from 'src/domain/entities/MedicoResidente.entity';

export const MEDICO_RESIDENTE_REPOSITORY = 'MEDICO_RESIDENTE_REPOSITORY';

export abstract class IMedicoResidenteRepository {
  abstract findAll(): Promise<MedicoResidente[]>;
  abstract findById(id: string): Promise<MedicoResidente | null>;
  abstract findByMedicoId(medicoId: string): Promise<MedicoResidente | null>;
  abstract create(medicoResidente: MedicoResidente): Promise<MedicoResidente>;
  abstract update(
    id: string,
    medicoResidente: MedicoResidente,
  ): Promise<MedicoResidente>;
  abstract delete(id: string): Promise<void>;
}
