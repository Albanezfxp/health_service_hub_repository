export const CARTEIRAFUNCIONAL_REPOSITORY = 'CARTEIRAFUNCIONAL_REPOSITORY';
import { CarteiraFuncional } from '../entities/CarteiraFuncional.entity';

export abstract class ICarteiraFuncionalRepository {
  abstract findAll(): Promise<CarteiraFuncional[]>;
  abstract findById(id: string): Promise<CarteiraFuncional>;
  abstract create(
    CarteiraFuncional: CarteiraFuncional,
  ): Promise<CarteiraFuncional>;
  abstract update(
    id: string,
    CarteiraFuncional: CarteiraFuncional,
  ): Promise<CarteiraFuncional>;
  abstract delete(id: string): Promise<void>;
}
