export class Equipamento {
  id?: string;
  nome: string;
  fabricante?: string;
  cor?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;

  constructor(
    nome: string,
    fabricante?: string,
    cor?: string,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
  ) {
    if (!nome) throw new Error('Nome é obrigatório');

    this.id = id;
    this.nome = nome;
    this.fabricante = fabricante;
    this.cor = cor;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
