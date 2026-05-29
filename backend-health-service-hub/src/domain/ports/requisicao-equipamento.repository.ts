export const REQUISICAO_EQUIPAMENTO_REPOSITORY =
  'REQUISICAO_EQUIPAMENTO_REPOSITORY';
import { RequisicaoEquipamento } from '../entities/RequisicaoEquipamento.entity';

export abstract class IRequisicaoEquipamentoRepository {
  abstract findAll(): Promise<RequisicaoEquipamento[]>;
  abstract findById(id: string): Promise<RequisicaoEquipamento | null>;
  abstract findByAuditoriaId(
    auditoriaId: string,
  ): Promise<RequisicaoEquipamento[]>;
  abstract findByEquipamentoId(
    equipamentoId: string,
  ): Promise<RequisicaoEquipamento[]>;
  abstract create(
    requisicao: RequisicaoEquipamento,
  ): Promise<RequisicaoEquipamento>;
  abstract update(
    id: string,
    requisicao: RequisicaoEquipamento,
  ): Promise<RequisicaoEquipamento>;
  abstract delete(id: string): Promise<void>;
}
