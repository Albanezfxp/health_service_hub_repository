// src/repositories/MedicoLotacao.repository.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { MedicoLotacao } from 'src/domain/entities/MedicoLotacao.entity';
import { IMedicoLotacaoRepository } from 'src/domain/ports/medico-lotacao.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class MedicoLotacaoRepository implements IMedicoLotacaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedicoLotacao[]> {
    const lotacoes = await this.prisma.medicoLotacao.findMany();
    return lotacoes.map(
      (l) =>
        new MedicoLotacao(
          l.dataInicio,
          l.idMedico,
          l.idAmbulatorio,
          l.id,
          l.dataFim || undefined,
          l.criadoEm,
        ),
    );
  }

  async findById(id: string): Promise<MedicoLotacao | null> {
    const lotacao = await this.prisma.medicoLotacao.findUnique({
      where: { id },
    });

    if (!lotacao) return null;

    return new MedicoLotacao(
      lotacao.dataInicio,
      lotacao.idMedico,
      lotacao.idAmbulatorio,
      lotacao.id,
      lotacao.dataFim || undefined,
      lotacao.criadoEm,
    );
  }

  async findByMedicoId(medicoId: string): Promise<MedicoLotacao[]> {
    const lotacoes = await this.prisma.medicoLotacao.findMany({
      where: { idMedico: medicoId },
    });

    return lotacoes.map(
      (l) =>
        new MedicoLotacao(
          l.dataInicio,
          l.idMedico,
          l.idAmbulatorio,
          l.id,
          l.dataFim || undefined,
          l.criadoEm,
        ),
    );
  }

  async findByAmbulatorioId(ambulatorioId: string): Promise<MedicoLotacao[]> {
    const lotacoes = await this.prisma.medicoLotacao.findMany({
      where: { idAmbulatorio: ambulatorioId },
    });

    return lotacoes.map(
      (l) =>
        new MedicoLotacao(
          l.dataInicio,
          l.idMedico,
          l.idAmbulatorio,
          l.id,
          l.dataFim || undefined,
          l.criadoEm,
        ),
    );
  }

  async create(medicoLotacao: MedicoLotacao): Promise<MedicoLotacao> {
    // Validar se médico existe
    const medico = await this.prisma.medico.findUnique({
      where: { id: medicoLotacao.medicoId },
    });
    if (!medico) throw new NotFoundException('Médico não encontrado');

    // Validar se ambulatorio existe
    const ambulatorio = await this.prisma.ambulatorio.findUnique({
      where: { id: medicoLotacao.ambulatorioId },
    });
    if (!ambulatorio) throw new NotFoundException('Ambulatório não encontrado');

    // Validar se já existe lotação ativa
    const lotacaoExistente = await this.prisma.medicoLotacao.findFirst({
      where: {
        idMedico: medicoLotacao.medicoId,
        idAmbulatorio: medicoLotacao.ambulatorioId,
        dataFim: null,
      },
    });
    if (lotacaoExistente) {
      throw new BadRequestException('Médico já está lotado neste ambulatório');
    }

    const created = await this.prisma.medicoLotacao.create({
      data: {
        dataInicio: medicoLotacao.dataInicio,
        dataFim: medicoLotacao.dataFim || null,
        idMedico: medicoLotacao.medicoId,
        idAmbulatorio: medicoLotacao.ambulatorioId,
      },
    });

    return new MedicoLotacao(
      created.dataInicio,
      created.idMedico,
      created.idAmbulatorio,
      created.id,
      created.dataFim || undefined,
      created.criadoEm,
    );
  }

  async update(
    id: string,
    medicoLotacao: MedicoLotacao,
  ): Promise<MedicoLotacao> {
    const exists = await this.prisma.medicoLotacao.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Lotação não encontrada');

    const updated = await this.prisma.medicoLotacao.update({
      where: { id },
      data: {
        dataInicio: medicoLotacao.dataInicio,
        dataFim: medicoLotacao.dataFim || null,
      },
    });

    return new MedicoLotacao(
      updated.dataInicio,
      updated.idMedico,
      updated.idAmbulatorio,
      updated.id,
      updated.dataFim || undefined,
      updated.criadoEm,
    );
  }

  async delete(id: string): Promise<void> {
    const exists = await this.prisma.medicoLotacao.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Lotação não encontrada');

    await this.prisma.medicoLotacao.delete({ where: { id } });
  }
}
