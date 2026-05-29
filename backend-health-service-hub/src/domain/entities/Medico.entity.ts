import { TipoMedico } from '@prisma/client';
export class Medico {
  id?: string;
  matricula: string;
  nome: string;
  telefone: string;
  email: string;
  tipo: TipoMedico;
  criadoEm?: Date;
  atualizadoEm?: Date;

  constructor(
    matricula: string,
    nome: string,
    telefone: string,
    email: string,
    tipo: TipoMedico,
    criadoEm?: Date,
    id?: string,
    atualizadoEm?: Date,
  ) {
    if (!matricula) throw new Error('Matricula é obrigatória ');
    if (!nome) throw new Error('Nome é obrigatório ');
    if (!telefone) throw new Error('Telefone é obrigatório');
    if (!email) throw new Error('Email é obrigatório ');
    if (!tipo) throw new Error('Tipo é obrigatório ');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) throw new Error('Email invalido ');
    this.id = id;
    this.matricula = matricula;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.tipo = tipo;
    this.criadoEm = criadoEm;
    if (atualizadoEm) {
      this.atualizadoEm = atualizadoEm;
    }
  }
}
