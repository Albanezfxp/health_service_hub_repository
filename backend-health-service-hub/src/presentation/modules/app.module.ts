import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HospitalModule } from './hospital.module';
import { AmbulatorioModule } from './ambulatorio.module';
import { MedicoModule } from './medico.module';
import { CarteiraFuncionalModule } from './carteiraFuncional.module';
import { AuditoriaModule } from './auditoria.module';
import { EquipamentoModule } from './equipamento.module';
import { MedicoEfetivoModule } from './medico-efetivo.module';
import { MedicoLotacaoModule } from './medico-lotacao.module';
import { MedicoResidenteModule } from './medico-residente.module';
import { RequisicaoEquipamentoModule } from './requisicao-equipamento.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HospitalModule,
    AmbulatorioModule,
    MedicoModule,
    CarteiraFuncionalModule,
    AuditoriaModule,
    EquipamentoModule,
    MedicoEfetivoModule,
    MedicoLotacaoModule,
    MedicoResidenteModule,
    RequisicaoEquipamentoModule,
    UserModule,
  ],
})
export class AppModule {}
