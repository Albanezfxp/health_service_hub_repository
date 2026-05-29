// src/application/mapper/Medico.mapper.ts

import { Medico } from 'src/domain/entities/Medico.entity';
import { MedicoCreateDto } from '../dto/Medico/Medico_create.dto';

export class MedicoMapper {
  static toDomain(dto: MedicoCreateDto): Medico {
    return new Medico(
      dto.matricula,
      dto.nome,
      dto.telefone,
      dto.email,
      dto.tipo,
      new Date(),
    );
  }

  static toResponse(medico: Medico) {
    return {
      id: medico.id,
      matricula: medico.matricula,
      nome: medico.nome,
      telefone: medico.telefone,
      email: medico.email,
      tipo: medico.tipo,
      criadoEm: medico.criadoEm,
      atualizadoEm: medico.atualizadoEm ?? null,
    };
  }

  static toResponseList(medicos: Medico[]) {
    return medicos.map((medico) => this.toResponse(medico));
  }

  static prismaToEntity(data: any): Medico {
    return new Medico(
      data.matricula,
      data.nome,
      data.telefone,
      data.email,
      data.tipo,
      data.criadoEm,
      data.id,
      data.atualizadoEm,
    );
  }

  static toPrismaCreate(medico: Medico) {
    return {
      matricula: medico.matricula,
      nome: medico.nome,
      telefone: medico.telefone,
      email: medico.email,
      tipo: medico.tipo,
    };
  }

  static toPrismaUpdate(medico: Medico) {
    return {
      matricula: medico.matricula,
      nome: medico.nome,
      telefone: medico.telefone,
      email: medico.email,
      tipo: medico.tipo,
    };
  }
}
