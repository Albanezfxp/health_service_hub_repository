import { User } from 'src/domain/entities/User.entity';
import { RegisterUserDto } from '../dto/User/create-user.dto';

export class UserMapper {
  static toDomain(dto: RegisterUserDto): User {
    if (!dto.nome || !dto.email || !dto.senha) {
      throw new Error('Dados inválidos');
    }
    return new User(dto.nome, dto.email, dto.senha);
  }

  static toResponse(user: User) {
    return {
      nome: user.nome,
      email: user.email,
      senha: user.senha,
    };
  }
  static toResponseList(user: User[]) {
    return user.map((user) => this.toResponse(user));
  }

  //   static prismaToEntity(data: any): Ambulatorio {
  //     return new Ambulatorio(
  //       data.nome,
  //       data.rua,
  //       data.cidade,
  //       data.estado,
  //       data.idHospital,
  //       {
  //         id: data.id,
  //         sigla: data.sigla ?? undefined,
  //         bairro: data.bairro ?? undefined,
  //         numero: data.numero ?? undefined,
  //         cep: data.cep ?? undefined,
  //         criadoEm: data.criadoEm,
  //         atualizadoEm: data.atualizadoEm,
  //       },
  //     );
  //   }
}
