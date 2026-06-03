import { TipoMedico } from '@prisma/client';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class MedicoCreateDto {
  @IsString()
  @IsNotEmpty()
  matricula!: string;

  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  telefone!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsEnum(TipoMedico, { message: 'Tipo deve ser Efetivo ou Residente' })
  tipo!: TipoMedico;
}
