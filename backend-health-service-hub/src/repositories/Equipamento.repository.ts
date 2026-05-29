import { Injectable, NotFoundException } from '@nestjs/common';
import { Equipamento } from 'src/domain/entities/Equipamento.entity';
import { IEquipamentoRepository } from 'src/domain/ports/equipamento.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class EquipamentoRepository implements IEquipamentoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Equipamento[]> {
    const equipamentos = await this.prisma.equipamento.findMany();
    return equipamentos.map(
      (e) =>
        new Equipamento(
          e.nome,
          e.fabricante || undefined,
          e.cor || undefined,
          e.id,
          e.criadoEm,
          e.atualizadoEm,
        ),
    );
  }

  async findById(id: string): Promise<Equipamento | null> {
    const equipamento = await this.prisma.equipamento.findUnique({
      where: { id },
    });

    if (!equipamento) return null;

    return new Equipamento(
      equipamento.nome,
      equipamento.fabricante || undefined,
      equipamento.cor || undefined,
      equipamento.id,
      equipamento.criadoEm,
      equipamento.atualizadoEm,
    );
  }

  async create(equipamento: Equipamento): Promise<Equipamento> {
    const created = await this.prisma.equipamento.create({
      data: {
        nome: equipamento.nome,
        fabricante: equipamento.fabricante || null,
        cor: equipamento.cor || null,
      },
    });

    return new Equipamento(
      created.nome,
      created.fabricante || undefined,
      created.cor || undefined,
      created.id,
      created.criadoEm,
      created.atualizadoEm,
    );
  }

  async update(id: string, equipamento: Equipamento): Promise<Equipamento> {
    const exists = await this.prisma.equipamento.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Equipamento não encontrado');

    const updated = await this.prisma.equipamento.update({
      where: { id },
      data: {
        nome: equipamento.nome,
        fabricante: equipamento.fabricante || null,
        cor: equipamento.cor || null,
      },
    });

    return new Equipamento(
      updated.nome,
      updated.fabricante || undefined,
      updated.cor || undefined,
      updated.id,
      updated.criadoEm,
      updated.atualizadoEm,
    );
  }

  async delete(id: string): Promise<void> {
    const exists = await this.prisma.equipamento.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Equipamento não encontrado');

    await this.prisma.equipamento.delete({ where: { id } });
  }
}
