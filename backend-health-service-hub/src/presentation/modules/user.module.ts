import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';

import { UserRepository } from 'src/repositories/User.repository';
import { UserController } from '../controllers/user.controller';
import { RegisterUserUseCase } from 'src/application/use-cases/user/Register-user.user-case';
import { FindByIdUserUseCase } from 'src/application/use-cases/user/FindById-user.user-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/FindAll-user.user-case';
import { UpdateUserUseCase } from 'src/application/use-cases/user/Update-user.user-case';
import { DeleteUserUseCase } from 'src/application/use-cases/user/Delete-user.user-case';
import { LoginUserUseCase } from 'src/application/use-cases/user/Login-user.user-case';
import { USER_REPOSITORY } from 'src/domain/ports/User.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    FindByIdUserUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    LoginUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
