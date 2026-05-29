import { Inject, Injectable } from '@nestjs/common';
import { AUDITORIA_REPOSITORY } from 'src/domain/ports/auditoria.repository';
import type { IAuditoriaRepository } from 'src/domain/ports/auditoria.repository';
@Injectable()
export class DeleteAuditoriaUseCase {
  constructor(
    @Inject(AUDITORIA_REPOSITORY)
    private readonly repository: IAuditoriaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
