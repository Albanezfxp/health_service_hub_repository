import { PartialType } from '@nestjs/mapped-types';
import { HospitalCreateDto } from './Hospital_create.dto';

export class HospitalUpdateDto extends PartialType(HospitalCreateDto) {}
