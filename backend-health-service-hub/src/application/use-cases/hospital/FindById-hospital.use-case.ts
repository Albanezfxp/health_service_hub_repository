import { Inject, Injectable } from '@nestjs/common';
import { Hospital } from 'src/domain/entities/Hospital.entity';
import {
  HOSPITAL_REPOSITORY,
  IhospitalRepository,
} from 'src/domain/ports/hospital.repository';

@Injectable()
export class FindByIdHospitalUseCase {
  constructor(
    @Inject(HOSPITAL_REPOSITORY)
    private readonly repository: IhospitalRepository,
  ) {}
  async execute(id: string): Promise<Hospital> {
    const hospital = await this.repository.findById(id);
    if (!hospital) throw new Error('Hospital não encontrado');

    return hospital;
  }
}
