export class Hospital {
  nome: string;
  endereco: string;
  capacidade?: number;
  id?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
  constructor(
    nome: string,
    endereco: string,
    capacidade?: number,
    id?: string,
    criadoEm?: Date,
    atualizadoEm?: Date,
  ) {
    if (!nome) {
      throw new Error('Atributo nome vazio');
    }
    if (!endereco) {
      throw new Error('Atributo endereco vazio');
    }
    if (criadoEm) {
      this.criadoEm = criadoEm;
    }
    if (atualizadoEm) {
      this.atualizadoEm = atualizadoEm;
    }

    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.capacidade = capacidade;
  }
}
