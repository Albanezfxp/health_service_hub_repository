import { PartialType } from '@nestjs/mapped-types';
import { CarteiraFuncionalCreateDto } from './CarteiraFuncional_create.dto';

export class CarteiraFuncionalUpdateDto extends PartialType(
  CarteiraFuncionalCreateDto,
) {}
