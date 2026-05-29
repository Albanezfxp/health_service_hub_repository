import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CarteiraFuncionalCreateDto } from 'src/application/dto/CarteiraFuncional/CarteiraFuncional_create.dto';
import { CarteiraFuncionalUpdateDto } from 'src/application/dto/CarteiraFuncional/CarteiraFuncional_update.dto';
import { CarteiraFuncionalMapper } from 'src/application/mapper/CarteiraFuncional.mapper';
import { CarteiraFuncional } from 'src/domain/entities/CarteiraFuncional.entity';
import { ICarteiraFuncionalRepository } from 'src/domain/ports/CarteiraFuncional.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class CarteiraFuncionalRepository implements ICarteiraFuncionalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CarteiraFuncional[]> {
    const CarteiraFuncionals_bd =
      await this.prisma.carteirafFuncional.findMany();

    const entity = CarteiraFuncionals_bd.map((carteiraFuncional) => {
      return new CarteiraFuncional(
        carteiraFuncional.crm,
        carteiraFuncional.dataExpedicao,
        carteiraFuncional.orgaoExpedidor || '',
        carteiraFuncional.id,
      );
    });
    return entity;
  }

  async findById(id: string): Promise<CarteiraFuncional> {
    const carteiraFuncional_bd =
      await this.prisma.carteirafFuncional.findUnique({
        where: { id: id },
      });

    if (!carteiraFuncional_bd)
      throw new NotFoundException('CarteiraFuncional não encontrado.');

    return CarteiraFuncionalMapper.prismaToEntity({
      ...carteiraFuncional_bd,
      orgaoExpedidor: carteiraFuncional_bd.orgaoExpedidor || '',
    });
  }

  async create(
    carteiraFuncional: CarteiraFuncionalCreateDto,
  ): Promise<CarteiraFuncional> {
    const CarteiraFuncional_exist =
      await this.prisma.carteirafFuncional.findUnique({
        where: { crm: carteiraFuncional.crm },
      });

    const medico_exist = await this.prisma.medico.findUnique({
      where: { id: carteiraFuncional.idMedico },
    });

    if (!medico_exist) {
      throw new NotFoundException('Médico não encontrado');
    }

    if (CarteiraFuncional_exist)
      throw new BadRequestException('CRM já cadastrado');

    try {
      const new_CarteiraFuncional = await this.prisma.carteirafFuncional.create(
        {
          data: {
            crm: carteiraFuncional.crm,
            dataExpedicao: carteiraFuncional.dataExpedicao,
            orgaoExpedidor: carteiraFuncional.orgaoExpedidor,
            criadoEm: new Date(),
            medico: {
              connect: {
                id: carteiraFuncional.idMedico,
              },
            },
          },
        },
      );

      return CarteiraFuncionalMapper.prismaToEntity({
        ...new_CarteiraFuncional,
        orgaoExpedidor: new_CarteiraFuncional.orgaoExpedidor || '',
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar CarteiraFuncional' + error);
    }
  }

  async update(
    id: string,
    carteiraFuncional: CarteiraFuncionalUpdateDto,
  ): Promise<CarteiraFuncional> {
    const carteiraFuncional_exist =
      await this.prisma.carteirafFuncional.findUnique({
        where: { id: id },
      });

    if (!carteiraFuncional_exist)
      throw new NotFoundException('Carteira Funcional não econtrada');

    try {
      const CarteiraFuncional_update =
        await this.prisma.carteirafFuncional.update({
          where: { id: id },
          data: {
            crm: carteiraFuncional.crm,
            dataExpedicao: carteiraFuncional.dataExpedicao,
            orgaoExpedidor: carteiraFuncional.orgaoExpedidor,
            criadoEm: new Date(),
            medico: {
              connect: {
                id: carteiraFuncional.idMedico,
              },
            },
          },
        });

      return CarteiraFuncionalMapper.prismaToEntity({
        ...CarteiraFuncional_update,
        orgaoExpedidor: (CarteiraFuncional_update as any).orgaoExpedidor || '',
      });
    } catch (error) {
      throw new BadRequestException(
        'Erro ao atualizar CarteiraFuncional' + error,
      );
    }
  }

  async delete(id: string): Promise<void> {
    const carteiraFuncional_exist =
      await this.prisma.carteirafFuncional.findUnique({
        where: { id: id },
      });
    if (!carteiraFuncional_exist)
      throw new NotFoundException('CarteiraFuncional não encontrado');

    await this.prisma.carteirafFuncional.delete({
      where: { id: carteiraFuncional_exist.id },
    });
  }
}
