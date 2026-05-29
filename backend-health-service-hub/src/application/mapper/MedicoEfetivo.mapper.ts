import { MedicoEfetivo } from 'src/domain/entities/MedicoEfetivo.entity';
import type { CreateMedicoEfetivoDto } from '../dto/MedicoEfetivo/create-medico-efetivo.dto';

export class MedicoEfetivoMapper {
  static toDomain(dto: CreateMedicoEfetivoDto): MedicoEfetivo {
    return new MedicoEfetivo(
      new Date(dto.dataAdmissao),
      dto.medicoId,
      dto.supervisorId,
    );
  }

  static toResponse(efetivo: MedicoEfetivo) {
    return {
      id: efetivo.id,
      medicoId: efetivo.medicoId,
      dataAdmissao: efetivo.dataAdmissao,
      supervisorId: efetivo.supervisorId || null,
      criadoEm: efetivo.criadoEm,
      atualizadoEm: efetivo.atualizadoEm,
    };
  }

  static toResponseList(efetivos: MedicoEfetivo[]) {
    return efetivos.map((e) => this.toResponse(e));
  }
}
