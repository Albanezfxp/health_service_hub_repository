import { Ambulatorio } from 'src/domain/entities/Ambulatorio.entity';
import { AmbulatorioCreateDto } from '../dto/Ambulatorio/Ambulatorio-create.dto';

export class AmbulatorioMapper {
  static toDomain(dto: AmbulatorioCreateDto): Ambulatorio {
    return new Ambulatorio(
      dto.nome,
      dto.rua,
      dto.cidade,
      dto.estado,
      dto.idHospital,
      {
        sigla: dto.sigla ?? undefined,
        bairro: dto.bairro,
        numero: dto.numero,
        cep: dto.cep,
      },
    );
  }

  static toResponse(ambulatorio: Ambulatorio) {
    return {
      id: ambulatorio.id,
      nome: ambulatorio.nome,
      sigla: ambulatorio.sigla,
      rua: ambulatorio.rua,
      bairro: ambulatorio.bairro,
      numero: ambulatorio.numero,
      cidade: ambulatorio.cidade,
      estado: ambulatorio.estado,
      cep: ambulatorio.cep,
      criadoEm: ambulatorio.criadoEm,
      hospital: ambulatorio.hospital?.nome ?? null,
    };
  }
  static toResponseList(ambulatorios: Ambulatorio[]) {
    return ambulatorios.map((ambulatorio) => this.toResponse(ambulatorio));
  }

  static prismaToEntity(data: any): Ambulatorio {
    return new Ambulatorio(
      data.nome,
      data.rua,
      data.cidade,
      data.estado,
      data.idHospital,
      {
        id: data.id,
        sigla: data.sigla ?? undefined,
        bairro: data.bairro ?? undefined,
        numero: data.numero ?? undefined,
        cep: data.cep ?? undefined,
        criadoEm: data.criadoEm,
        atualizadoEm: data.atualizadoEm,
      },
    );
  }
}
