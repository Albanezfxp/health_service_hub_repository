export const MEDICO_REPOSITORY = 'Medico_REPOSITORY';

import type { MedicoCreateDto } from 'src/application/dto/Medico/Medico_create.dto';
import type { Medico } from '../entities/Medico.entity';
import type { MedicoUpdateDto } from 'src/application/dto/Medico/Medico_update.dto';

export abstract class IMedicoRepository {
  abstract findAll(): Promise<Medico[]>;

  abstract findById(id: string): Promise<Medico | null>;
  abstract create(medico: MedicoCreateDto): Promise<Medico>;
  abstract update(id: string, medico: MedicoUpdateDto): Promise<Medico>;

  abstract delete(id: string): Promise<void>;
}
