import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  senha?: string;
}
