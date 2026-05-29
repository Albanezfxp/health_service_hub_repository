export class User {
  id?: string;
  nome: string;
  email: string;
  senha?: string;

  constructor(nome: string, email: string, senha?: string, id?: string) {
    if (!nome) throw Error('Nome está vazio');
    if (!email) throw Error('Email está vazio');
    if (senha) this.senha = senha;
    this.nome = nome;
    this.email = email;

    this.id = id;
  }
}
