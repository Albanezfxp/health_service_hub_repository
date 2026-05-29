import { Hospital } from './Hospital.entity';

export class Ambulatorio {
  id?: string;

  nome: string;
  sigla?: string;

  rua: string;
  bairro?: string;
  numero?: string;

  cidade: string;
  estado: string;
  cep?: string;

  idHospital: string;
  hospital?: Hospital;

  medicosLotados?: any[];
  auditorias?: any[];

  criadoEm?: Date;
  atualizadoEm?: Date;

  constructor(
    nome: string,
    rua: string,
    cidade: string,
    estado: string,
    idHospital: string,
    props?: {
      sigla?: string;
      bairro?: string;
      numero?: string;
      cep?: string;
      hospital?: Hospital;
      medicosLotados?: any[];
      auditorias?: any[];
      criadoEm?: Date;
      atualizadoEm?: Date;
      id?: string;
    },
  ) {
    if (!nome) throw new Error('Nome é obrigatório');
    if (!rua) throw new Error('Rua é obrigatória');
    if (!cidade) throw new Error('Cidade é obrigatória');
    if (!estado) throw new Error('Estado é obrigatório');
    if (!idHospital) throw new Error('idHospital é obrigatório');

    this.nome = nome;
    this.rua = rua;
    this.cidade = cidade;
    this.estado = estado;
    this.idHospital = idHospital;

    this.sigla = props?.sigla;
    this.bairro = props?.bairro;
    this.numero = props?.numero;
    this.cep = props?.cep;

    this.hospital = props?.hospital;

    this.medicosLotados = props?.medicosLotados;
    this.auditorias = props?.auditorias;

    this.criadoEm = props?.criadoEm;
    this.atualizadoEm = props?.atualizadoEm;

    this.id = props?.id;
  }
}
