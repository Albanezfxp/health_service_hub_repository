import { Inject, Injectable } from '@nestjs/common';
import { Hospital } from 'src/domain/entities/Hospital.entity';
import {
  HOSPITAL_REPOSITORY,
  IhospitalRepository,
} from 'src/domain/ports/hospital.repository';

@Injectable()
export class FindAllHospitalUseCase {
  constructor(
    @Inject(HOSPITAL_REPOSITORY)
    private readonly repository: IhospitalRepository,
  ) {}
  async execute(): Promise<Hospital[]> {
    return await this.repository.findAll();
  }
}
