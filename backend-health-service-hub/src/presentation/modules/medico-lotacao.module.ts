import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { MedicoLotacaoController } from '../controllers/medico-lotacao.controller';
import { CreateMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/create-medico-lotacao.use-case';
import { FindByIdMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/findById-medico-lotacao.use-case';
import { FindAllMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/findAll-medico-lotacao.use-case';
import { UpdateMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/update-medico-lotacao.use-case';
import { DeleteMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/delete-medico-lotacao.use-case';
import {
  MEDICO_LOTACAO_REPOSITORY,
  IMedicoLotacaoRepository,
} from 'src/domain/ports/medico-lotacao.repository';
import { MedicoLotacaoRepository } from 'src/repositories/MedicoLotacao.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MedicoLotacaoController],
  providers: [
    CreateMedicoLotacaoUseCase,
    FindByIdMedicoLotacaoUseCase,
    FindAllMedicoLotacaoUseCase,
    UpdateMedicoLotacaoUseCase,
    DeleteMedicoLotacaoUseCase,
    {
      provide: MEDICO_LOTACAO_REPOSITORY,
      useClass: MedicoLotacaoRepository,
    },
  ],
})
export class MedicoLotacaoModule {}
