import { UpdateUserDto } from '../../dto/User/update-user.dto';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/ports/User.repository';
import { User } from 'src/domain/entities/User.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, dto);
  }
}
