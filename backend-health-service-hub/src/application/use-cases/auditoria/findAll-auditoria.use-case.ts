import { Inject, Injectable } from '@nestjs/common';
import { Auditoria } from 'src/domain/entities/Auditoria.entity';
import { AUDITORIA_REPOSITORY } from 'src/domain/ports/auditoria.repository';
import type { IAuditoriaRepository } from 'src/domain/ports/auditoria.repository';

@Injectable()
export class FindAllAuditoriaUseCase {
  constructor(
    @Inject(AUDITORIA_REPOSITORY)
    private readonly repository: IAuditoriaRepository,
  ) {}

  async execute(): Promise<Auditoria[]> {
    return this.repository.findAll();
  }
}
