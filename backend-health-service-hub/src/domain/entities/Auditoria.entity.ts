export class Auditoria {
  id?: string;
  dataAuditoria: Date;
  observacoes?: string;
  ambulatorioId: string;
  medicoResponsavelId: string;
  criadoEm?: Date;
  atualizadoEm?: Date;

  constructor(
    dataAuditoria: Date,
    ambulatorioId: string,
    medicoResponsavelId: string,
    observacoes?: string,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
  ) {
    if (!dataAuditoria) throw new Error('dataAuditoria é obrigatória');
    if (!ambulatorioId) throw new Error('ambulatorioId é obrigatório');
    if (!medicoResponsavelId)
      throw new Error('medicoResponsavelId é obrigatório');

    this.id = id;
    this.dataAuditoria = dataAuditoria;
    this.observacoes = observacoes;
    this.ambulatorioId = ambulatorioId;
    this.medicoResponsavelId = medicoResponsavelId;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
