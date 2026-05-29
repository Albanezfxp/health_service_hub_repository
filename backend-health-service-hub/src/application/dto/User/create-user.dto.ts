import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  nome?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  senha?: string;
  @IsString()
  @MinLength(6)
  confirm_password?: string;
}
