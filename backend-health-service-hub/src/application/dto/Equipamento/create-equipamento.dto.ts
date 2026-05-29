import { IsString, IsOptional } from 'class-validator';

export class CreateEquipamentoDto {
  @IsString()
  nome!: string;

  @IsOptional()
  @IsString()
  fabricante?: string;

  @IsOptional()
  @IsString()
  cor?: string;
}
