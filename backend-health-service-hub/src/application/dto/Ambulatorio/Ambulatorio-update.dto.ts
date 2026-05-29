import { PartialType } from '@nestjs/mapped-types';
import { AmbulatorioCreateDto } from './Ambulatorio-create.dto';

export class AmbulatorioUpdateDto extends PartialType(AmbulatorioCreateDto) {}
