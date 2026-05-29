// src/repositories/Auditoria.repository.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Auditoria } from 'src/domain/entities/Auditoria.entity';
import { IAuditoriaRepository } from 'src/domain/ports/auditoria.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class AuditoriaRepository implements IAuditoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Auditoria[]> {
    const auditorias = await this.prisma.auditoria.findMany();
    return auditorias.map(
      (a) =>
        new Auditoria(
          a.dataAuditoria,
          a.idAmbulatorio,
          a.idMedicoResponsavel,
          a.observacoes || undefined,
          a.id,
          a.criadoEm,
          a.atualizadoEm,
        ),
    );
  }

  async findById(id: string): Promise<Auditoria | null> {
    const auditoria = await this.prisma.auditoria.findUnique({
      where: { id },
    });

    if (!auditoria) return null;

    return new Auditoria(
      auditoria.dataAuditoria,
      auditoria.idAmbulatorio,
      auditoria.idMedicoResponsavel,
      auditoria.observacoes || undefined,
      auditoria.id,
      auditoria.criadoEm,
      auditoria.atualizadoEm,
    );
  }

  async findByAmbulatorioId(ambulatorioId: string): Promise<Auditoria[]> {
    const auditorias = await this.prisma.auditoria.findMany({
      where: { idAmbulatorio: ambulatorioId },
    });

    return auditorias.map(
      (a) =>
        new Auditoria(
          a.dataAuditoria,
          a.idAmbulatorio,
          a.idMedicoResponsavel,
          a.observacoes || undefined,
          a.id,
          a.criadoEm,
          a.atualizadoEm,
        ),
    );
  }

  async findByMedicoResponsavelId(
    medicoResponsavelId: string,
  ): Promise<Auditoria[]> {
    const auditorias = await this.prisma.auditoria.findMany({
      where: { idMedicoResponsavel: medicoResponsavelId },
    });

    return auditorias.map(
      (a) =>
        new Auditoria(
          a.dataAuditoria,
          a.idAmbulatorio,
          a.idMedicoResponsavel,
          a.observacoes || undefined,
          a.id,
          a.criadoEm,
          a.atualizadoEm,
        ),
    );
  }

  async create(auditoria: Auditoria): Promise<Auditoria> {
    const ambulatorio = await this.prisma.ambulatorio.findUnique({
      where: { id: auditoria.ambulatorioId },
    });
    if (!ambulatorio) throw new NotFoundException('Ambulatório não encontrado');

    const medico = await this.prisma.medicoEfetivo.findUnique({
      where: { id: auditoria.medicoResponsavelId },
    });
    if (!medico) throw new NotFoundException('Médico Efetivo não encontrado');

    const created = await this.prisma.auditoria.create({
      data: {
        dataAuditoria: auditoria.dataAuditoria,
        observacoes: auditoria.observacoes || null,
        idAmbulatorio: auditoria.ambulatorioId,
        idMedicoResponsavel: auditoria.medicoResponsavelId,
      },
    });

    return new Auditoria(
      created.dataAuditoria,
      created.idAmbulatorio,
      created.idMedicoResponsavel,
      created.observacoes || undefined,
      created.id,
      created.criadoEm,
      created.atualizadoEm,
    );
  }

  async update(id: string, auditoria: Auditoria): Promise<Auditoria> {
    const exists = await this.prisma.auditoria.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Auditoria não encontrada');

    const updated = await this.prisma.auditoria.update({
      where: { id },
      data: {
        dataAuditoria: auditoria.dataAuditoria,
        observacoes: auditoria.observacoes || null,
      },
    });

    return new Auditoria(
      updated.dataAuditoria,
      updated.idAmbulatorio,
      updated.idMedicoResponsavel,
      updated.observacoes || undefined,
      updated.id,
      updated.criadoEm,
      updated.atualizadoEm,
    );
  }

  async delete(id: string): Promise<void> {
    const exists = await this.prisma.auditoria.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Auditoria não encontrada');

    await this.prisma.auditoria.delete({ where: { id } });
  }
}
