import { IsString, IsOptional, Length, IsUUID } from 'class-validator';

export class AmbulatorioCreateDto {
  @IsString()
  @Length(1, 100)
  nome!: string;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  sigla!: string;

  @IsString()
  @Length(1, 100)
  rua!: string;

  @IsString()
  @Length(1, 50)
  bairro!: string;

  @IsString()
  @Length(1, 10)
  numero!: string;

  @IsString()
  @Length(1, 50)
  cidade!: string;

  @IsString()
  @Length(2, 2)
  estado!: string;

  @IsString()
  @Length(8, 8)
  cep!: string;

  @IsString()
  @IsUUID()
  idHospital!: string;
}
