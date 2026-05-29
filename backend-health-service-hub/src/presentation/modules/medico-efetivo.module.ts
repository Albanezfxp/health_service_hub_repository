import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { MedicoEfetivoController } from '../controllers/medico-efetivo.controller';
import { CreateMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/create-medico-efetivo.use-case';
import { FindByIdMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/findById-medico-efetivo.use-case';
import { FindAllMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/findAll-medico-efetivo.use-case';
import { UpdateMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/update-medico-efetivo.use-case';
import { DeleteMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/delete-medico-efetivo.use-case';
import {
  MEDICO_EFETIVO_REPOSITORY,
  IMedicoEfetivoRepository,
} from 'src/domain/ports/medico-efetivo.repository';
import { MedicoEfetivoRepository } from 'src/repositories/MedicoEfetivo.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MedicoEfetivoController],
  providers: [
    CreateMedicoEfetivoUseCase,
    FindByIdMedicoEfetivoUseCase,
    FindAllMedicoEfetivoUseCase,
    UpdateMedicoEfetivoUseCase,
    DeleteMedicoEfetivoUseCase,
    {
      provide: MEDICO_EFETIVO_REPOSITORY,
      useClass: MedicoEfetivoRepository,
    },
  ],
})
export class MedicoEfetivoModule {}
