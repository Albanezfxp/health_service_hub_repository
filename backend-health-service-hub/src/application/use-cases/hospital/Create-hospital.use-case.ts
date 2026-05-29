import { Inject, Injectable } from '@nestjs/common';
import { HospitalCreateDto } from 'src/application/dto/Hospital/Hospital_create.dto';
import { Hospital } from 'src/domain/entities/Hospital.entity';
import {
  HOSPITAL_REPOSITORY,
  IhospitalRepository,
} from 'src/domain/ports/hospital.repository';

@Injectable()
export class CreateHospitalUseCase {
  constructor(
    @Inject(HOSPITAL_REPOSITORY)
    private readonly repository: IhospitalRepository,
  ) {}

  async execute(hospital: HospitalCreateDto): Promise<Hospital> {
    const entity = new Hospital(
      hospital.nome,
      hospital.endereco,
      hospital.capacidade,
    );

    return await this.repository.create(entity);
  }
}
