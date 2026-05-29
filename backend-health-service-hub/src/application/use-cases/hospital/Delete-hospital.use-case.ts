import { Inject, Injectable } from '@nestjs/common';
import {
  HOSPITAL_REPOSITORY,
  IhospitalRepository,
} from 'src/domain/ports/hospital.repository';

@Injectable()
export class DeleteHospitalUseCase {
  constructor(
    @Inject(HOSPITAL_REPOSITORY)
    private readonly repository: IhospitalRepository,
  ) {}

  async execute(id: string): Promise<void | null> {
    const hospitalExist = await this.repository.findById(id);
    if (!hospitalExist) {
      throw new Error('Hospital não encontrado');
    }

    await this.repository.delete(String(id));
  }
}
