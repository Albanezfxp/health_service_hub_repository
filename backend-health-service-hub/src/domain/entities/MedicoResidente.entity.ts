export class MedicoResidente {
  id?: string;
  valorBolsa?: number;
  orgaoPagador?: string;
  dataInicioResidencia?: Date;
  medicoId: string;
  criadoEm?: Date;
  atualizadoEm?: Date;

  constructor(
    medicoId: string,
    valorBolsa?: number,
    orgaoPagador?: string,
    dataInicioResidencia?: Date,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
  ) {
    if (!medicoId) throw new Error('medicoId é obrigatório');

    this.id = id;
    this.medicoId = medicoId;
    this.valorBolsa = valorBolsa;
    this.orgaoPagador = orgaoPagador;
    this.dataInicioResidencia = dataInicioResidencia;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
