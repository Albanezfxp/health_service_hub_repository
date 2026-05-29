import { IhospitalRepository } from 'src/domain/ports/hospital.repository';
import { Injectable } from '@nestjs/common';
import { Hospital } from 'src/domain/entities/Hospital.entity';
import { HospitalCreateDto } from 'src/application/dto/Hospital/Hospital_create.dto';
import { HospitalUpdateDto } from 'src/application/dto/Hospital/Hospital_update.dto';
import { HospitalMapper } from 'src/application/mapper/Hospital.mapper';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
@Injectable()
export class HospitalRepository implements IhospitalRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Hospital[]> {
    const hospitais = await this.prisma.hospital.findMany();

    const entityHospitais = hospitais.map(
      (h) =>
        new Hospital(
          h.nome,
          h.endereco,
          h.capacidade || undefined,
          h.id,
          h.criadoEm,
          h.atualizadoEm,
        ),
    );
    return entityHospitais.map((hospital) =>
      HospitalMapper.prismaToEntity(hospital),
    );
  }

  async findById(id: string): Promise<Hospital | null> {
    const hospital_bd = await this.prisma.hospital.findUnique({
      where: { id: String(id) },
    });

    if (!hospital_bd) return null;

    const entityHospital = new Hospital(
      hospital_bd.nome,
      hospital_bd.endereco,
      hospital_bd.capacidade || undefined,
      hospital_bd.id,
      hospital_bd.criadoEm,
      hospital_bd.atualizadoEm,
    );

    return HospitalMapper.prismaToEntity(entityHospital);
  }

  async create(hospital: HospitalCreateDto): Promise<Hospital> {
    const new_hospital = await this.prisma.hospital.create({
      data: {
        nome: hospital.nome,
        endereco: hospital.endereco,
        capacidade: hospital.capacidade,
        criadoEm: new Date(),
      },
    });

    const entityHospital = new Hospital(
      new_hospital.nome,
      new_hospital.endereco,
      new_hospital.capacidade || undefined,
      new_hospital.id,
      new_hospital.criadoEm,
      new_hospital.atualizadoEm,
    );

    return HospitalMapper.prismaToEntity(entityHospital);
  }

  async update(id: string, hospital: HospitalUpdateDto): Promise<Hospital> {
    const hospital_bd = await this.prisma.hospital.findUnique({
      where: { id: String(id) },
    });

    if (!hospital_bd) throw new Error('Hospital não encontrado!');

    const hospital_update = await this.prisma.hospital.update({
      where: { id: String(hospital_bd.id) },
      data: hospital,
    });

    const entityHospital = new Hospital(
      hospital_update.nome,
      hospital_update.endereco,
      hospital_update.capacidade || undefined,
      hospital_update.id,
      hospital_update.criadoEm,
      hospital_update.atualizadoEm,
    );

    return HospitalMapper.prismaToEntity(entityHospital);
  }

  async delete(id: string): Promise<void> {
    const hospital_bd = await this.prisma.hospital.findUnique({
      where: { id: String(id) },
    });

    if (!hospital_bd) throw new Error('Hospital não encontrado!');

    await this.prisma.hospital.delete({
      where: { id: String(hospital_bd.id) },
    });
  }
}
