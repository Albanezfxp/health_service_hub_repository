import { IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class HospitalCreateDto {
  @IsString({ message: 'Nome deve ser uma string' })
  nome!: string;
  @IsString({ message: 'Endereço deve ser uma string' })
  @MinLength(6, { message: 'Endereço deve ter no minimo 6 caracteres' })
  endereco!: string;
  @IsOptional()
  @IsNumber({}, { message: 'Capacidade deve ser um number' })
  capacidade?: number;
}
