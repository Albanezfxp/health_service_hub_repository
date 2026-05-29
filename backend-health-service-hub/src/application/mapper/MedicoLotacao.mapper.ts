import { MedicoLotacao } from 'src/domain/entities/MedicoLotacao.entity';
import { CreateMedicoLotacaoDto } from '../dto/MedicoLotacao/create-medico-lotacao.dto';

export class MedicoLotacaoMapper {
  static toDomain(dto: CreateMedicoLotacaoDto): MedicoLotacao {
    return new MedicoLotacao(
      new Date(dto.dataInicio),
      dto.medicoId,
      dto.ambulatorioId,
      undefined,
      dto.dataFim ? new Date(dto.dataFim) : undefined,
    );
  }

  static toResponse(lotacao: MedicoLotacao) {
    return {
      id: lotacao.id,
      dataInicio: lotacao.dataInicio,
      dataFim: lotacao.dataFim || null,
      medicoId: lotacao.medicoId,
      ambulatorioId: lotacao.ambulatorioId,
      criadoEm: lotacao.criadoEm,
    };
  }

  static toResponseList(lotacoes: MedicoLotacao[]) {
    return lotacoes.map((l) => this.toResponse(l));
  }
}
