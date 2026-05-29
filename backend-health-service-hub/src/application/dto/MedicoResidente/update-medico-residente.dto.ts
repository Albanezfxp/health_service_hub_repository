import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoResidenteDto } from './create-medico-residente.dto';

export class UpdateMedicoResidenteDto extends PartialType(
  CreateMedicoResidenteDto,
) {}
