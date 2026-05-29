import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { RegisterUserDto } from 'src/application/dto/User/create-user.dto';
import { LoginUserDto } from 'src/application/dto/User/login-user.dto';
import { UpdateUserDto } from 'src/application/dto/User/update-user.dto';
import { DeleteUserUseCase } from 'src/application/use-cases/user/Delete-user.user-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/FindAll-user.user-case';
import { FindByIdUserUseCase } from 'src/application/use-cases/user/FindById-user.user-case';
import { LoginUserUseCase } from 'src/application/use-cases/user/Login-user.user-case';
import { RegisterUserUseCase } from 'src/application/use-cases/user/Register-user.user-case';
import { UpdateUserUseCase } from 'src/application/use-cases/user/Update-user.user-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly findUser: FindByIdUserUseCase,
    private readonly findAllUsers: FindAllUsersUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return await this.registerUser.execute(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return await this.loginUser.execute(dto);
  }

  @Get()
  async findAll() {
    return await this.findAllUsers.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findUser.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.updateUser.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUser.execute(id);
    return { message: 'Usuário deletado com sucesso' };
  }
}
