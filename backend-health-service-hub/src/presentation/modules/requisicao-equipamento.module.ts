import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { RequisicaoEquipamentoController } from '../controllers/requisicao-equipamento.controller';
import { CreateRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/create-requisicao-equipamento.use-case';
import { FindByIdRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/findById-requisicao-equipamento.use-case';
import { FindAllRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/findAll-requisicao-equipamento.use-case';
import { UpdateRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/update-requisicao-equipamento.use-case';
import { DeleteRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/delete-requisicao-equipamento.use-case';
import {
  REQUISICAO_EQUIPAMENTO_REPOSITORY,
  IRequisicaoEquipamentoRepository,
} from 'src/domain/ports/requisicao-equipamento.repository';
import { RequisicaoEquipamentoRepository } from 'src/repositories/RequisicaoEquipamento.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RequisicaoEquipamentoController],
  providers: [
    CreateRequisicaoEquipamentoUseCase,
    FindByIdRequisicaoEquipamentoUseCase,
    FindAllRequisicaoEquipamentoUseCase,
    UpdateRequisicaoEquipamentoUseCase,
    DeleteRequisicaoEquipamentoUseCase,
    {
      provide: REQUISICAO_EQUIPAMENTO_REPOSITORY,
      useClass: RequisicaoEquipamentoRepository,
    },
  ],
})
export class RequisicaoEquipamentoModule {}
