export const USER_REPOSITORY = 'USER_REPOSITORY';
import { RegisterUserDto } from 'src/application/dto/User/create-user.dto';
import { User } from '../entities/User.entity';
import { UpdateUserDto } from 'src/application/dto/User/update-user.dto';
import { LoginUserDto } from 'src/application/dto/User/login-user.dto';

export abstract class IUserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User>;
  abstract login(dto: LoginUserDto): Promise<User>;
  abstract register(dto: RegisterUserDto): Promise<User>;
  abstract update(id: string, dto: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
