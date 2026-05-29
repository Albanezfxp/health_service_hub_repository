import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { MedicoResidenteController } from '../controllers/medico-residente.controller';
import { CreateMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/create-medico-residente.use-case';
import { FindByIdMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/findById-medico-residente.use-case';
import { FindAllMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/findAll-medico-residente.use-case';
import { UpdateMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/update-medico-residente.use-case';
import { DeleteMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/delete-medico-residente.use-case';
import {
  MEDICO_RESIDENTE_REPOSITORY,
  IMedicoResidenteRepository,
} from 'src/domain/ports/medico-residente.repository';
import { MedicoResidenteRepository } from 'src/repositories/MedicoResidente.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MedicoResidenteController],
  providers: [
    CreateMedicoResidenteUseCase,
    FindByIdMedicoResidenteUseCase,
    FindAllMedicoResidenteUseCase,
    UpdateMedicoResidenteUseCase,
    DeleteMedicoResidenteUseCase,
    {
      provide: MEDICO_RESIDENTE_REPOSITORY,
      useClass: MedicoResidenteRepository,
    },
  ],
})
export class MedicoResidenteModule {}
