import { Injectable, NotFoundException } from '@nestjs/common';
import { AmbulatorioMapper } from 'src/application/mapper/Ambulatorio.mapper';
import { Ambulatorio } from 'src/domain/entities/Ambulatorio.entity';
import { IAmbulatorioRepository } from 'src/domain/ports/ambulatorio.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class AmbulatorioRepository implements IAmbulatorioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Ambulatorio[]> {
    const ambulatorios_bd = await this.prisma.ambulatorio.findMany();

    if (!ambulatorios_bd)
      throw new NotFoundException('Ambulatorios não encontrado');

    return ambulatorios_bd.map(
      (a) =>
        new Ambulatorio(a.nome, a.rua, a.cidade, a.estado, a.idHospital, {
          sigla: a.sigla || undefined,
          bairro: a.bairro || undefined,
          numero: a.numero || undefined,
          cep: a.cep || undefined,
          id: a.id,
          criadoEm: a.criadoEm,
          atualizadoEm: a.atualizadoEm,
        }),
    );
  }

  async findById(id: string): Promise<Ambulatorio> {
    const ambulatorio_bd = await this.prisma.ambulatorio.findUnique({
      where: { id: id },
    });

    if (!ambulatorio_bd)
      throw new NotFoundException('Ambulatorio não encontrado');

    const ambulatorio_entity = new Ambulatorio(
      ambulatorio_bd.nome,
      ambulatorio_bd.rua,
      ambulatorio_bd.cidade,
      ambulatorio_bd.estado,
      ambulatorio_bd.idHospital,
    );

    return AmbulatorioMapper.prismaToEntity(ambulatorio_entity);
  }

  async create(ambulatorio: Ambulatorio): Promise<Ambulatorio> {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id: ambulatorio.idHospital },
    });

    if (!hospital) {
      throw new NotFoundException('Hospital não encontrado');
    }

    try {
      const created = await this.prisma.ambulatorio.create({
        data: {
          nome: ambulatorio.nome,
          rua: ambulatorio.rua,
          cidade: ambulatorio.cidade,
          estado: ambulatorio.estado,
          bairro: ambulatorio.bairro || null,
          numero: ambulatorio.numero || null,
          cep: ambulatorio.cep || null,
          sigla: ambulatorio.sigla || null,
          hospital: {
            connect: {
              id: ambulatorio.idHospital,
            },
          },
        },
      });

      return new Ambulatorio(
        created.nome,
        created.rua,
        created.cidade,
        created.estado,
        created.idHospital,
        {
          sigla: created.sigla || undefined,
          bairro: created.bairro || undefined,
          numero: created.numero || undefined,
          cep: created.cep || undefined,
          id: created.id,
          criadoEm: created.criadoEm,
          atualizadoEm: created.atualizadoEm,
        },
      );
    } catch (error) {
      console.error('❌ ERRO ao criar ambulatorio:', error);
      throw error;
    }
  }
  async update(id: string, ambulatorio: Ambulatorio): Promise<Ambulatorio> {
    const exists = await this.prisma.ambulatorio.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Ambulatorio não encontrado');
    }

    const updated = await this.prisma.ambulatorio.update({
      where: { id },
      data: {
        nome: ambulatorio.nome,
        cidade: ambulatorio.cidade,
        estado: ambulatorio.estado,
        rua: ambulatorio.rua,
        bairro: ambulatorio.bairro ?? null,
        numero: ambulatorio.numero ?? null,
        cep: ambulatorio.cep ?? null,
        sigla: ambulatorio.sigla ?? null,

        hospital: {
          connect: {
            id: ambulatorio.idHospital,
          },
        },
      },
    });

    return AmbulatorioMapper.prismaToEntity(updated);
  }
  async delete(id: string): Promise<void> {
    const ambulatorio_bd = await this.prisma.ambulatorio.findUnique({
      where: { id: id },
    });
    if (!ambulatorio_bd)
      throw new NotFoundException('Ambulatorio não encontrado');

    await this.prisma.ambulatorio.delete({
      where: { id: ambulatorio_bd.id },
    });
  }
}
