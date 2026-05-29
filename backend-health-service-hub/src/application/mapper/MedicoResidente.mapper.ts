import { MedicoResidente } from 'src/domain/entities/MedicoResidente.entity';
import { CreateMedicoResidenteDto } from '../dto/MedicoResidente/create-medico-residente.dto';

export class MedicoResidenteMapper {
  static toDomain(dto: CreateMedicoResidenteDto): MedicoResidente {
    return new MedicoResidente(
      dto.medicoId,
      dto.valorBolsa,
      dto.orgaoPagador,
      dto.dataInicioResidencia ? new Date(dto.dataInicioResidencia) : undefined,
    );
  }

  static toResponse(residente: MedicoResidente) {
    return {
      id: residente.id,
      medicoId: residente.medicoId,
      valorBolsa: residente.valorBolsa || null,
      orgaoPagador: residente.orgaoPagador || null,
      dataInicioResidencia: residente.dataInicioResidencia || null,
      criadoEm: residente.criadoEm,
      atualizadoEm: residente.atualizadoEm,
    };
  }

  static toResponseList(residentes: MedicoResidente[]) {
    return residentes.map((r) => this.toResponse(r));
  }
}
