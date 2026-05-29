import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicoResidente } from 'src/domain/entities/MedicoResidente.entity';
import { IMedicoResidenteRepository } from 'src/domain/ports/medico-residente.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class MedicoResidenteRepository implements IMedicoResidenteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedicoResidente[]> {
    const residentes = await this.prisma.medicoResidente.findMany();
    return residentes.map(
      (r) =>
        new MedicoResidente(
          r.idMedico,
          r.valorBolsa ? Number(r.valorBolsa) : undefined,
          r.orgaoPagador || undefined,
          r.dataInicioResidencia || undefined,
          r.id,
          r.criadoEm,
          r.atualizadoEm,
        ),
    );
  }

  async findById(id: string): Promise<MedicoResidente | null> {
    const residente = await this.prisma.medicoResidente.findUnique({
      where: { id },
    });

    if (!residente) return null;

    return new MedicoResidente(
      residente.idMedico,
      residente.valorBolsa ? Number(residente.valorBolsa) : undefined,
      residente.orgaoPagador || undefined,
      residente.dataInicioResidencia || undefined,
      residente.id,
      residente.criadoEm,
      residente.atualizadoEm,
    );
  }

  async findByMedicoId(medicoId: string): Promise<MedicoResidente | null> {
    const residente = await this.prisma.medicoResidente.findUnique({
      where: { idMedico: medicoId },
    });

    if (!residente) return null;

    return new MedicoResidente(
      residente.idMedico,
      residente.valorBolsa ? Number(residente.valorBolsa) : undefined,
      residente.orgaoPagador || undefined,
      residente.dataInicioResidencia || undefined,
      residente.id,
      residente.criadoEm,
      residente.atualizadoEm,
    );
  }

  async create(medicoResidente: MedicoResidente): Promise<MedicoResidente> {
    const medico = await this.prisma.medico.findUnique({
      where: { id: medicoResidente.medicoId },
    });
    if (!medico) throw new NotFoundException('Médico não encontrado');

    const created = await this.prisma.medicoResidente.create({
      data: {
        idMedico: medicoResidente.medicoId,
        valorBolsa: medicoResidente.valorBolsa
          ? String(medicoResidente.valorBolsa)
          : null,
        orgaoPagador: medicoResidente.orgaoPagador || null,
        dataInicioResidencia: medicoResidente.dataInicioResidencia || null,
      },
    });

    return new MedicoResidente(
      created.idMedico,
      created.valorBolsa ? Number(created.valorBolsa) : undefined,
      created.orgaoPagador || undefined,
      created.dataInicioResidencia || undefined,
      created.id,
      created.criadoEm,
      created.atualizadoEm,
    );
  }

  async update(
    id: string,
    medicoResidente: MedicoResidente,
  ): Promise<MedicoResidente> {
    const exists = await this.prisma.medicoResidente.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Médico Residente não encontrado');

    const updated = await this.prisma.medicoResidente.update({
      where: { id },
      data: {
        valorBolsa: medicoResidente.valorBolsa
          ? String(medicoResidente.valorBolsa)
          : null,
        orgaoPagador: medicoResidente.orgaoPagador || null,
        dataInicioResidencia: medicoResidente.dataInicioResidencia || null,
      },
    });

    return new MedicoResidente(
      updated.idMedico,
      updated.valorBolsa ? Number(updated.valorBolsa) : undefined,
      updated.orgaoPagador || undefined,
      updated.dataInicioResidencia || undefined,
      updated.id,
      updated.criadoEm,
      updated.atualizadoEm,
    );
  }

  async delete(id: string): Promise<void> {
    const exists = await this.prisma.medicoResidente.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Médico Residente não encontrado');

    await this.prisma.medicoResidente.delete({ where: { id } });
  }
}
