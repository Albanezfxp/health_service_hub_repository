import { TipoMedico } from '@prisma/client';
import { IsString, MinLength, IsEnum } from 'class-validator';

export class MedicoCreateDto {
  @IsString({ message: 'Matricula deve ser uma string' })
  matricula!: string;
  @IsString({ message: 'Nome deve ser uma string' })
  nome!: string;
  @IsString({ message: 'Telefone deve ser uma string' })
  @MinLength(8, { message: 'Endereço deve ter no minimo 8 caracteres' })
  telefone!: string;
  @IsString({ message: 'Capacidade deve ser um number' })
  email!: string;
  @IsEnum(TipoMedico)
  tipo!: TipoMedico;
}
