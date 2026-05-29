import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MedicoCreateDto } from 'src/application/dto/Medico/Medico_create.dto';
import { MedicoUpdateDto } from 'src/application/dto/Medico/Medico_update.dto';
import { MedicoMapper } from 'src/application/mapper/Medico.mapper';
import { Medico } from 'src/domain/entities/Medico.entity';
import { IMedicoRepository } from 'src/domain/ports/medico.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class MedicoRepository implements IMedicoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Medico[]> {
    const medicos_bd = await this.prisma.medico.findMany();

    const entity = medicos_bd.map((medico) => {
      return new Medico(
        medico.matricula,
        medico.nome,
        medico.telefone ?? '',
        medico.email ?? '',
        medico.tipo,
        medico.criadoEm,
      );
    });
    return entity;
  }

  async findById(id: string): Promise<Medico | null> {
    const medico_bd = await this.prisma.medico.findUnique({
      where: { id: id },
    });

    if (!medico_bd) throw new NotFoundException('Medico não encontrado.');

    return MedicoMapper.prismaToEntity(medico_bd);
  }

  async create(medico: MedicoCreateDto): Promise<Medico> {
    const medico_exist = await this.prisma.medico.findUnique({
      where: { matricula: medico.matricula },
    });

    if (medico_exist) throw new BadRequestException('Matricula já cadastrado');
    try {
      const new_medico = await this.prisma.medico.create({
        data: {
          matricula: medico.matricula,
          nome: medico.nome,
          email: medico.email,
          telefone: medico.telefone,
          tipo: medico.tipo,
          criadoEm: new Date(),
        },
      });

      return MedicoMapper.prismaToEntity(new_medico);
    } catch (error) {
      throw new BadRequestException('Erro ao criar medico' + error);
    }
  }

  async update(id: string, medico: MedicoUpdateDto): Promise<Medico> {
    const medico_exist = await this.prisma.medico.findUnique({
      where: { id: id },
    });

    if (!medico_exist) throw new NotFoundException('Medico não econtrado');

    try {
      const medico_update = await this.prisma.medico.update({
        where: { id: id },
        data: {
          matricula: medico.matricula,
          nome: medico.nome,
          email: medico.email,
          telefone: medico.telefone,
          tipo: medico.tipo,
          atualizadoEm: new Date(),
        },
      });

      return MedicoMapper.prismaToEntity(medico_update);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar medico' + error);
    }
  }

  async delete(id: string): Promise<void> {
    const medico_exist = await this.prisma.medico.findUnique({
      where: { id: id },
    });
    if (!medico_exist) throw new NotFoundException('Medico não encontrado');

    await this.prisma.medico.delete({ where: { id: medico_exist.id } });
  }
}
