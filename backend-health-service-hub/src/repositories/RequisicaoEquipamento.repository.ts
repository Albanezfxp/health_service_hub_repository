// src/repositories/RequisicaoEquipamento.repository.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { StatusRequisicao } from '@prisma/client';
import { RequisicaoEquipamento } from 'src/domain/entities/RequisicaoEquipamento.entity';
import { IRequisicaoEquipamentoRepository } from 'src/domain/ports/requisicao-equipamento.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class RequisicaoEquipamentoRepository implements IRequisicaoEquipamentoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RequisicaoEquipamento[]> {
    const requisicoes = await this.prisma.requisicaoEquipamento.findMany();
    return requisicoes.map(
      (r) =>
        new RequisicaoEquipamento(
          r.numeroRequisicao,
          r.dataRequisicao,
          r.quantidade,
          r.idAuditoria,
          r.idEquipamento,
          r.status as StatusRequisicao,
          r.dataEntrega || undefined,
          r.id,
          r.criadoEm,
          r.atualizadoEm,
        ),
    );
  }

  async findById(id: string): Promise<RequisicaoEquipamento | null> {
    const requisicao = await this.prisma.requisicaoEquipamento.findUnique({
      where: { id },
    });

    if (!requisicao) return null;

    return new RequisicaoEquipamento(
      requisicao.numeroRequisicao,
      requisicao.dataRequisicao,
      requisicao.quantidade,
      requisicao.idAuditoria,
      requisicao.idEquipamento,
      requisicao.status as StatusRequisicao,
      requisicao.dataEntrega || undefined,
      requisicao.id,
      requisicao.criadoEm,
      requisicao.atualizadoEm,
    );
  }

  async findByAuditoriaId(
    auditoriaId: string,
  ): Promise<RequisicaoEquipamento[]> {
    const requisicoes = await this.prisma.requisicaoEquipamento.findMany({
      where: { idAuditoria: auditoriaId },
    });

    return requisicoes.map(
      (r) =>
        new RequisicaoEquipamento(
          r.numeroRequisicao,
          r.dataRequisicao,
          r.quantidade,
          r.idAuditoria,
          r.idEquipamento,
          r.status as StatusRequisicao,
          r.dataEntrega || undefined,
          r.id,
          r.criadoEm,
          r.atualizadoEm,
        ),
    );
  }

  async findByEquipamentoId(
    equipamentoId: string,
  ): Promise<RequisicaoEquipamento[]> {
    const requisicoes = await this.prisma.requisicaoEquipamento.findMany({
      where: { idEquipamento: equipamentoId },
    });

    return requisicoes.map(
      (r) =>
        new RequisicaoEquipamento(
          r.numeroRequisicao,
          r.dataRequisicao,
          r.quantidade,
          r.idAuditoria,
          r.idEquipamento,
          r.status as StatusRequisicao,
          r.dataEntrega || undefined,
          r.id,
          r.criadoEm,
          r.atualizadoEm,
        ),
    );
  }

  async create(
    requisicao: RequisicaoEquipamento,
  ): Promise<RequisicaoEquipamento> {
    // Validar auditoria
    const auditoria = await this.prisma.auditoria.findUnique({
      where: { id: requisicao.auditoriaId },
    });
    if (!auditoria) throw new NotFoundException('Auditoria não encontrada');

    // Validar equipamento
    const equipamento = await this.prisma.equipamento.findUnique({
      where: { id: requisicao.equipamentoId },
    });
    if (!equipamento) throw new NotFoundException('Equipamento não encontrado');

    // Validar se número de requisição já existe
    const existente = await this.prisma.requisicaoEquipamento.findUnique({
      where: { numeroRequisicao: requisicao.numeroRequisicao },
    });
    if (existente) {
      throw new BadRequestException('Número de requisição já existe');
    }

    const created = await this.prisma.requisicaoEquipamento.create({
      data: {
        numeroRequisicao: requisicao.numeroRequisicao,
        dataRequisicao: requisicao.dataRequisicao,
        quantidade: requisicao.quantidade,
        status: requisicao.status,
        dataEntrega: requisicao.dataEntrega || null,
        idAuditoria: requisicao.auditoriaId,
        idEquipamento: requisicao.equipamentoId,
      },
    });

    return new RequisicaoEquipamento(
      created.numeroRequisicao,
      created.dataRequisicao,
      created.quantidade,
      created.idAuditoria,
      created.idEquipamento,
      created.status as StatusRequisicao,
      created.dataEntrega || undefined,
      created.id,
      created.criadoEm,
      created.atualizadoEm,
    );
  }

  async update(
    id: string,
    requisicao: RequisicaoEquipamento,
  ): Promise<RequisicaoEquipamento> {
    const exists = await this.prisma.requisicaoEquipamento.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Requisição não encontrada');

    const updated = await this.prisma.requisicaoEquipamento.update({
      where: { id },
      data: {
        quantidade: requisicao.quantidade,
        status: requisicao.status,
        dataEntrega: requisicao.dataEntrega || null,
      },
    });

    return new RequisicaoEquipamento(
      updated.numeroRequisicao,
      updated.dataRequisicao,
      updated.quantidade,
      updated.idAuditoria,
      updated.idEquipamento,
      updated.status as StatusRequisicao,
      updated.dataEntrega || undefined,
      updated.id,
      updated.criadoEm,
      updated.atualizadoEm,
    );
  }

  async delete(id: string): Promise<void> {
    const exists = await this.prisma.requisicaoEquipamento.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Requisição não encontrada');

    await this.prisma.requisicaoEquipamento.delete({ where: { id } });
  }
}
