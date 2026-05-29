import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { AmbulatorioController } from '../controllers/ambulatorio.controler';
import { CreateAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/Create-ambulatorio.use-case';
import { FindByIdAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/FindById-ambulatorio.use-case';
import { FindAllAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/FindAll-ambulatorio.use-case';
import { UpdateAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/Update-ambulatorio.use-case';
import { DeleteAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/Delete-ambulatorio.use-case';
import { AMBULATORIO_REPOSITORY } from 'src/domain/ports/ambulatorio.repository';
import { AmbulatorioRepository } from 'src/repositories/Ambulatorio.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AmbulatorioController],
  providers: [
    CreateAmbulatorioUseCase,
    FindByIdAmbulatorioUseCase,
    FindAllAmbulatorioUseCase,
    UpdateAmbulatorioUseCase,
    DeleteAmbulatorioUseCase,
    {
      provide: AMBULATORIO_REPOSITORY,
      useClass: AmbulatorioRepository,
    },
  ],
})
export class AmbulatorioModule {}
