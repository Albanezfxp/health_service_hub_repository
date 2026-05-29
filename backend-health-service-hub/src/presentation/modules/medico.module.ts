import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { MedicoRepository } from 'src/repositories/Medico.repository';
import { MedicoController } from '../controllers/medico.controller';
import { CreateMedicoUseCase } from 'src/application/use-cases/medico/Create-medico.use-case';
import { FindByIdMedicoUseCase } from 'src/application/use-cases/medico/FindById-medico.use-case';
import { FindAllMedicoUseCase } from 'src/application/use-cases/medico/FindAll-medico.use-case';
import { UpdateMedicoUseCase } from 'src/application/use-cases/medico/Update-medico.use-case';
import { DeleteMedicoUseCase } from 'src/application/use-cases/medico/Delete-medico.use-case';
import { MEDICO_REPOSITORY } from 'src/domain/ports/medico.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MedicoController],
  providers: [
    CreateMedicoUseCase,
    FindByIdMedicoUseCase,
    FindAllMedicoUseCase,
    UpdateMedicoUseCase,
    DeleteMedicoUseCase,
    {
      provide: MEDICO_REPOSITORY,
      useClass: MedicoRepository,
    },
  ],
})
export class MedicoModule {}
