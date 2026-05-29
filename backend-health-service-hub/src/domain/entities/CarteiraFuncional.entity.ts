export class CarteiraFuncional {
  id?: string;
  crm: string;
  dataExpedicao: Date;
  orgaoExpedidor: string;
  criadoEm?: Date;
  AtualizadoEm?: Date;
  idMedico: string;

  constructor(
    crm: string,
    dataExpedicao: Date,
    orgaoExpedidor: string,
    idMedico: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
    id?: string,
  ) {
    if (!crm) throw new Error('CRM é obrigatorio');
    if (!dataExpedicao) throw new Error('Data de Expecição é obrigatoria');
    if (!orgaoExpedidor) throw new Error('Orgão Expedidor é obrigatorio');
    if (!idMedico) throw new Error('Id do Medico é obrigatorio');

    this.crm = crm;
    this.dataExpedicao = dataExpedicao;
    this.orgaoExpedidor = orgaoExpedidor;
    this.idMedico = idMedico;
    this.criadoEm = criadoEm;
    this.AtualizadoEm = atualizadoEm;
    this.id = id;
  }
}
