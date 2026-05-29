import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { EquipamentoController } from '../controllers/equipamento.controller';
import { EQUIPAMENTO_REPOSITORY } from 'src/domain/ports/equipamento.repository';
import { EquipamentoRepository } from 'src/repositories/Equipamento.repository';
import { CreateEquipamentoUseCase } from 'src/application/use-cases/Equipamento/create-equipamento.use-case';
import { FindByIdEquipamentoUseCase } from 'src/application/use-cases/Equipamento/findById-equipamento.use-case';
import { FindAllEquipamentoUseCase } from 'src/application/use-cases/Equipamento/findAll-equipamento.use-case';
import { UpdateEquipamentoUseCase } from 'src/application/use-cases/Equipamento/update-equipamento.use-case';
import { DeleteEquipamentoUseCase } from 'src/application/use-cases/Equipamento/delete-equipamento.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [EquipamentoController],
  providers: [
    CreateEquipamentoUseCase,
    FindByIdEquipamentoUseCase,
    FindAllEquipamentoUseCase,
    UpdateEquipamentoUseCase,
    DeleteEquipamentoUseCase,
    {
      provide: EQUIPAMENTO_REPOSITORY,
      useClass: EquipamentoRepository,
    },
  ],
})
export class EquipamentoModule {}
