import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { MedicoEfetivo } from 'src/domain/entities/MedicoEfetivo.entity';
import { IMedicoEfetivoRepository } from 'src/domain/ports/medico-efetivo.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class MedicoEfetivoRepository implements IMedicoEfetivoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedicoEfetivo[]> {
    const efetivos = await this.prisma.medicoEfetivo.findMany();
    return efetivos.map(
      (e) =>
        new MedicoEfetivo(
          e.dataAdmissao,
          e.idMedico,
          e.idSupervisor || undefined,
          e.id,
          e.criadoEm,
          e.atualizadoEm,
        ),
    );
  }

  async findById(id: string): Promise<MedicoEfetivo | null> {
    const efetivo = await this.prisma.medicoEfetivo.findUnique({
      where: { id },
    });

    if (!efetivo) return null;

    return new MedicoEfetivo(
      efetivo.dataAdmissao,
      efetivo.idMedico,
      efetivo.idSupervisor || undefined,
      efetivo.id,
      efetivo.criadoEm,
      efetivo.atualizadoEm,
    );
  }

  async findByMedicoId(medicoId: string): Promise<MedicoEfetivo | null> {
    const efetivo = await this.prisma.medicoEfetivo.findUnique({
      where: { idMedico: medicoId },
    });

    if (!efetivo) return null;

    return new MedicoEfetivo(
      efetivo.dataAdmissao,
      efetivo.idMedico,
      efetivo.idSupervisor || undefined,
      efetivo.id,
      efetivo.criadoEm,
      efetivo.atualizadoEm,
    );
  }

  async create(medicoEfetivo: MedicoEfetivo): Promise<MedicoEfetivo> {
    const medico = await this.prisma.medico.findUnique({
      where: { id: medicoEfetivo.medicoId },
    });
    if (!medico) throw new NotFoundException('Médico não encontrado');

    if (medicoEfetivo.supervisorId) {
      const supervisor = await this.prisma.medicoEfetivo.findUnique({
        where: { id: medicoEfetivo.supervisorId },
      });
      if (!supervisor) throw new NotFoundException('Supervisor não encontrado');
    }

    const created = await this.prisma.medicoEfetivo.create({
      data: {
        dataAdmissao: medicoEfetivo.dataAdmissao,
        idMedico: medicoEfetivo.medicoId,
        idSupervisor: medicoEfetivo.supervisorId || null,
      },
    });

    return new MedicoEfetivo(
      created.dataAdmissao,
      created.idMedico,
      created.idSupervisor || undefined,
      created.id,
      created.criadoEm,
      created.atualizadoEm,
    );
  }

  async update(
    id: string,
    medicoEfetivo: MedicoEfetivo,
  ): Promise<MedicoEfetivo> {
    const exists = await this.prisma.medicoEfetivo.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Médico Efetivo não encontrado');

    if (medicoEfetivo.supervisorId) {
      const supervisor = await this.prisma.medicoEfetivo.findUnique({
        where: { id: medicoEfetivo.supervisorId },
      });
      if (!supervisor) throw new NotFoundException('Supervisor não encontrado');
    }

    const updated = await this.prisma.medicoEfetivo.update({
      where: { id },
      data: {
        dataAdmissao: medicoEfetivo.dataAdmissao,
        idSupervisor: medicoEfetivo.supervisorId || null,
      },
    });

    return new MedicoEfetivo(
      updated.dataAdmissao,
      updated.idMedico,
      updated.idSupervisor || undefined,
      updated.id,
      updated.criadoEm,
      updated.atualizadoEm,
    );
  }

  async delete(id: string): Promise<void> {
    const exists = await this.prisma.medicoEfetivo.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Médico Efetivo não encontrado');

    await this.prisma.medicoEfetivo.delete({ where: { id } });
  }
}
