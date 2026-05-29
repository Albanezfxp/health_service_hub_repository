import { IsDateString, IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateAuditoriaDto {
  @IsDateString()
  dataAuditoria!: string;

  @IsUUID()
  ambulatorioId!: string;

  @IsUUID()
  medicoResponsavelId!: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
