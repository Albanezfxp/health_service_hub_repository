export const HOSPITAL_REPOSITORY = 'HOSPITAL_REPOSITORY';

import type { HospitalCreateDto } from 'src/application/dto/Hospital/Hospital_create.dto';
import type { Hospital } from '../entities/Hospital.entity';
import type { HospitalUpdateDto } from 'src/application/dto/Hospital/Hospital_update.dto';
export abstract class IhospitalRepository {
  abstract findAll(): Promise<Hospital[]>;

  abstract findById(id: string): Promise<Hospital | null>;
  abstract create(hospital: HospitalCreateDto): Promise<Hospital>;
  abstract update(id: string, hospital: HospitalUpdateDto): Promise<Hospital>;

  abstract delete(id: string): Promise<void>;
}
