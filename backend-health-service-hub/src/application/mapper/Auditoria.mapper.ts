// src/application/mapper/Auditoria.mapper.ts

import { Auditoria } from 'src/domain/entities/Auditoria.entity';
import type { CreateAuditoriaDto } from '../dto/Auditoria/create-auditoria.dto';

export class AuditoriaMapper {
  static toDomain(dto: CreateAuditoriaDto): Auditoria {
    return new Auditoria(
      new Date(dto.dataAuditoria),
      dto.ambulatorioId,
      dto.medicoResponsavelId,
      dto.observacoes,
    );
  }

  static toResponse(auditoria: Auditoria) {
    return {
      id: auditoria.id,
      dataAuditoria: auditoria.dataAuditoria,
      observacoes: auditoria.observacoes || null,
      ambulatorioId: auditoria.ambulatorioId,
      medicoResponsavelId: auditoria.medicoResponsavelId,
      criadoEm: auditoria.criadoEm,
      atualizadoEm: auditoria.atualizadoEm,
    };
  }

  static toResponseList(auditorias: Auditoria[]) {
    return auditorias.map((a) => this.toResponse(a));
  }
}
