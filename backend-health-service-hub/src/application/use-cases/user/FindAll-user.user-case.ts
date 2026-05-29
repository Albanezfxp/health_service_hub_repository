import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/ports/User.repository';
import { User } from 'src/domain/entities/User.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
