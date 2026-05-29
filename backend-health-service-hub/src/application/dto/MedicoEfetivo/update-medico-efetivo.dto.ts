import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoEfetivoDto } from './create-medico-efetivo.dto';

export class UpdateMedicoEfetivoDto extends PartialType(
  CreateMedicoEfetivoDto,
) {}
