export class MedicoLotacao {
  id?: string;
  dataInicio: Date;
  dataFim?: Date;
  medicoId: string;
  ambulatorioId: string;
  criadoEm?: Date;

  constructor(
    dataInicio: Date,
    medicoId: string,
    ambulatorioId: string,
    id?: string,
    dataFim?: Date,
    criadoEm?: Date,
  ) {
    if (!dataInicio) throw new Error('dataInicio é obrigatória');
    if (!medicoId) throw new Error('medicoId é obrigatório');
    if (!ambulatorioId) throw new Error('ambulatorioId é obrigatório');

    this.id = id;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.medicoId = medicoId;
    this.ambulatorioId = ambulatorioId;
    this.criadoEm = criadoEm;
  }
}
