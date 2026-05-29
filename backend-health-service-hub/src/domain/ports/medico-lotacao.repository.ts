export const MEDICO_LOTACAO_REPOSITORY = 'MEDICO_LOTACAO_REPOSITORY';
import { MedicoLotacao } from '../entities/MedicoLotacao.entity';

export abstract class IMedicoLotacaoRepository {
  abstract findAll(): Promise<MedicoLotacao[]>;
  abstract findById(id: string): Promise<MedicoLotacao | null>;
  abstract findByMedicoId(medicoId: string): Promise<MedicoLotacao[]>;
  abstract findByAmbulatorioId(ambulatorioId: string): Promise<MedicoLotacao[]>;
  abstract create(medicoLotacao: MedicoLotacao): Promise<MedicoLotacao>;
  abstract update(
    id: string,
    medicoLotacao: MedicoLotacao,
  ): Promise<MedicoLotacao>;
  abstract delete(id: string): Promise<void>;
}
