import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { AuditoriaController } from '../controllers/auditoria.controller';
import { CreateAuditoriaUseCase } from 'src/application/use-cases/auditoria/create-auditoria.use-case';
import { FindByIdAuditoriaUseCase } from 'src/application/use-cases/auditoria/findById-auditoria.use-case';
import { FindAllAuditoriaUseCase } from 'src/application/use-cases/auditoria/findAll-auditoria.use-case';
import { UpdateAuditoriaUseCase } from 'src/application/use-cases/auditoria/update-auditoria.use-case';
import { DeleteAuditoriaUseCase } from 'src/application/use-cases/auditoria/delete-auditoria.use-case';
import { AUDITORIA_REPOSITORY } from 'src/domain/ports/auditoria.repository';
import { AuditoriaRepository } from 'src/repositories/Auditoria.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AuditoriaController],
  providers: [
    CreateAuditoriaUseCase,
    FindByIdAuditoriaUseCase,
    FindAllAuditoriaUseCase,
    UpdateAuditoriaUseCase,
    DeleteAuditoriaUseCase,
    {
      provide: AUDITORIA_REPOSITORY,
      useClass: AuditoriaRepository,
    },
  ],
})
export class AuditoriaModule {}
