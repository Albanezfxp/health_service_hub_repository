// src/application/dto/MedicoLotacao/update-medico-lotacao.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsOptional } from 'class-validator';
import { CreateMedicoLotacaoDto } from './create-medico-lotacao.dto';

export class UpdateMedicoLotacaoDto extends PartialType(
  CreateMedicoLotacaoDto,
) {}
