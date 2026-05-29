import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(LoginUserDto) {
  @IsString()
  @IsOptional()
  nome?: string;
}
