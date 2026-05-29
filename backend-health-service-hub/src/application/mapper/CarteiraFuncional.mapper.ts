import { CarteiraFuncional } from 'src/domain/entities/CarteiraFuncional.entity';
import { CarteiraFuncionalCreateDto } from '../dto/CarteiraFuncional/CarteiraFuncional_create.dto';

export class CarteiraFuncionalMapper {
  static toDomain(dto: CarteiraFuncionalCreateDto): CarteiraFuncional {
    return new CarteiraFuncional(
      dto.crm,
      dto.dataExpedicao,
      dto.orgaoExpedidor,
      dto.idMedico,
    );
  }

  static toResponse(CarteiraFuncional: CarteiraFuncional) {
    return {
      id: CarteiraFuncional.id,
      crm: CarteiraFuncional.crm,
      dataExpedicao: CarteiraFuncional.dataExpedicao,
      orgaoExpedidor: CarteiraFuncional.orgaoExpedidor,
      idMedico: CarteiraFuncional.idMedico,
      criadoEm: CarteiraFuncional.criadoEm,
    };
  }
  static toResponseList(CarteiraFuncionals: CarteiraFuncional[]) {
    return CarteiraFuncionals.map((CarteiraFuncional) =>
      this.toResponse(CarteiraFuncional),
    );
  }

  static prismaToEntity(data: CarteiraFuncional): CarteiraFuncional {
    return new CarteiraFuncional(
      data.crm,
      data.dataExpedicao,
      data.orgaoExpedidor,
      data.idMedico,
    );
  }
}
