import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from 'src/application/dto/User/create-user.dto';
import { User } from 'src/domain/entities/User.entity';
import { IUserRepository } from 'src/domain/ports/User.repository';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/application/dto/User/update-user.dto';
import { LoginUserDto } from 'src/application/dto/User/login-user.dto';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findInBd(id: string): Promise<User> {
    const user_bd = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user_bd) throw new NotFoundException('Usuario não encontrado');

    return user_bd;
  }

  async findAll(): Promise<User[]> {
    const users_bd = await this.prisma.user.findMany();
    const users_entity = users_bd.map((u) => new User(u.nome, u.email));
    return users_entity;
  }

  async findById(id: string): Promise<User> {
    const user_bd = await this.findInBd(id);

    const entity = new User(user_bd.nome, user_bd.email);

    return entity;
  }

  async login(dto: LoginUserDto): Promise<User> {
    const user_bd = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (!user_bd) throw new NotFoundException('Usuario não encontrado');

    if (!user_bd.senha) throw new BadRequestException('Usuario sem senha');

    if (!dto.senha) {
      throw new Error('Senha é obrigatória');
    }

    if (!user_bd?.senha) {
      throw new Error('Usuário inválido');
    }

    const isMatch = await bcrypt.compare(dto.senha, user_bd.senha);
    if (!isMatch) throw new BadRequestException('Senha incorreta');

    return new User(user_bd.nome, user_bd.email);
  }

  async register(dto: RegisterUserDto): Promise<User> {
    if (!dto.email || !dto.nome || !dto.senha) {
      throw new BadRequestException('Campos invalidos');
    }

    const user_bd = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (user_bd) throw new BadRequestException('Usuario já existe');
    if (dto.senha !== dto.confirm_password)
      throw new BadRequestException('Senhas não coincidem');
    const password = await bcrypt.hash(dto.senha, 10);

    const new_user = await this.prisma.user.create({
      data: {
        email: dto.email,
        nome: dto.nome,
        senha: password,
      },
    });

    if (!new_user) throw new BadRequestException('Erro ao criar usuario');

    const entity = new User(new_user.nome, new_user.email);
    return entity;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user_bd = await this.findInBd(id);

    const user_update = await this.prisma.user.update({
      where: { id: user_bd.id },
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: dto.senha,
      },
    });

    if (!user_update)
      throw new BadRequestException('Erro ao atualizar usuario');

    const entity = new User(user_update.nome, user_update.email);

    return entity;
  }

  async delete(id: string): Promise<void> {
    const user_bd = await this.findInBd(id);

    await this.prisma.user.delete({
      where: { id: user_bd.id },
    });
  }
}
