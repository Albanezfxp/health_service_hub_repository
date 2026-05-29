export class MedicoEfetivo {
  id?: string;
  dataAdmissao: Date;
  medicoId: string;
  supervisorId?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;

  constructor(
    dataAdmissao: Date,
    medicoId: string,
    supervisorId?: string,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
  ) {
    if (!dataAdmissao) throw new Error('dataAdmissao é obrigatória');
    if (!medicoId) throw new Error('medicoId é obrigatório');

    this.id = id;
    this.dataAdmissao = dataAdmissao;
    this.medicoId = medicoId;
    this.supervisorId = supervisorId;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
