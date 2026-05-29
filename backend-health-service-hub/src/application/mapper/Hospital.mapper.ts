import { Hospital } from 'src/domain/entities/Hospital.entity';
import { HospitalCreateDto } from '../dto/Hospital/Hospital_create.dto';

export class HospitalMapper {
  static toDomain(dto: HospitalCreateDto): Hospital {
    return new Hospital(dto.nome, dto.endereco, dto.capacidade);
  }

  static toResponse(hospital: Hospital) {
    return {
      id: hospital.id,
      nome: hospital.nome,
      endereco: hospital.endereco,
      capacidade: hospital.capacidade ?? null,
      criadoEm: hospital.criadoEm,
      atualizadoEm: hospital.atualizadoEm,
    };
  }

  static toResponseList(hospitais: Hospital[]) {
    return hospitais.map((hospital) => {
      return this.toResponse(hospital);
    });
  }
  static prismaToEntity(data: any): Hospital {
    return new Hospital(
      data.nome,
      data.endereco,
      data.capacidade ?? undefined,
      data.id,
      data.criadoEm,
      data.atualizadoEm,
    );
  }
}
