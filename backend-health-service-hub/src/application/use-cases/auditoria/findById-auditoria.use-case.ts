import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Auditoria } from 'src/domain/entities/Auditoria.entity';
import { AUDITORIA_REPOSITORY } from 'src/domain/ports/auditoria.repository';
import type { IAuditoriaRepository } from 'src/domain/ports/auditoria.repository';

@Injectable()
export class FindByIdAuditoriaUseCase {
  constructor(
    @Inject(AUDITORIA_REPOSITORY)
    private readonly repository: IAuditoriaRepository,
  ) {}

  async execute(id: string): Promise<Auditoria> {
    const auditoria = await this.repository.findById(id);

    if (!auditoria) {
      throw new NotFoundException('Auditoria não encontrada');
    }

    return auditoria;
  }
}
