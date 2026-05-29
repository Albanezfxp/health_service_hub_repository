import { IsString, IsDate } from 'class-validator';

export class CarteiraFuncionalCreateDto {
  @IsString({ message: 'CRM deve ser uma string' })
  crm!: string;
  @IsString({ message: 'Orgão Expedidor deve ser uma string' })
  orgaoExpedidor!: string;
  @IsDate()
  dataExpedicao!: Date;
  @IsString({ message: 'Id Medico deve ser uma string' })
  idMedico!: string;
}
