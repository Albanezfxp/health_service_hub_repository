import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { HospitalController } from '../controllers/hospital.controller';
import { CreateHospitalUseCase } from 'src/application/use-cases/hospital/Create-hospital.use-case';
import { FindByIdHospitalUseCase } from 'src/application/use-cases/hospital/FindById-hospital.use-case';
import { FindAllHospitalUseCase } from 'src/application/use-cases/hospital/FindAll-hospital.use-case';
import { UpdateHospitalUseCase } from 'src/application/use-cases/hospital/Update-hospital.use-case';
import { DeleteHospitalUseCase } from 'src/application/use-cases/hospital/Delete-hospital.use-case';
import { HOSPITAL_REPOSITORY } from 'src/domain/ports/hospital.repository';
import { HospitalRepository } from 'src/repositories/Hospital.repository';

@Module({
  imports: [PrismaModule],
  controllers: [HospitalController],
  providers: [
    CreateHospitalUseCase,
    FindByIdHospitalUseCase,
    FindAllHospitalUseCase,
    UpdateHospitalUseCase,
    DeleteHospitalUseCase,
    {
      provide: HOSPITAL_REPOSITORY,
      useClass: HospitalRepository,
    },
  ],
})
export class HospitalModule {}
