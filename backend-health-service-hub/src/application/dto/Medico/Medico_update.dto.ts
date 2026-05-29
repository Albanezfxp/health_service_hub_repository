import { PartialType } from '@nestjs/mapped-types';
import { MedicoCreateDto } from './Medico_create.dto';

export class MedicoUpdateDto extends PartialType(MedicoCreateDto) {}
