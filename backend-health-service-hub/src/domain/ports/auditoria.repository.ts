export const AUDITORIA_REPOSITORY = 'AUDITORIA_REPOSITORY';
import { Auditoria } from '../entities/Auditoria.entity';

export abstract class IAuditoriaRepository {
  abstract findAll(): Promise<Auditoria[]>;
  abstract findById(id: string): Promise<Auditoria | null>;
  abstract findByAmbulatorioId(ambulatorioId: string): Promise<Auditoria[]>;
  abstract findByMedicoResponsavelId(
    medicoResponsavelId: string,
  ): Promise<Auditoria[]>;
  abstract create(auditoria: Auditoria): Promise<Auditoria>;
  abstract update(id: string, auditoria: Auditoria): Promise<Auditoria>;
  abstract delete(id: string): Promise<void>;
}
