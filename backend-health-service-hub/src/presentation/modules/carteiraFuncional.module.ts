import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { CarteiraFuncionalRepository } from 'src/repositories/CarteiraFuncional.repository';
import { CarteiraFuncionalController } from '../controllers/carteiraFuncional.controller';
import { CreateCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/Create-carteiraFuncional.use-case';
import { FindByIdCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/FindById-carteiraFuncional.use-case';
import { FindAllCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/FindAll-carteiraFuncional.use-case';
import { UpdateCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/Update-carteiraFuncional.use-case';
import { DeleteCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/Delete-carteiraFuncional.use-case';
import { CARTEIRAFUNCIONAL_REPOSITORY } from 'src/domain/ports/CarteiraFuncional.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CarteiraFuncionalController],
  providers: [
    CreateCarteiraFuncionalUseCase,
    FindByIdCarteiraFuncionalUseCase,
    FindAllCarteiraFuncionalUseCase,
    UpdateCarteiraFuncionalUseCase,
    DeleteCarteiraFuncionalUseCase,
    {
      provide: CARTEIRAFUNCIONAL_REPOSITORY,
      useClass: CarteiraFuncionalRepository,
    },
  ],
})
export class CarteiraFuncionalModule {}
