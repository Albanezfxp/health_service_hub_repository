import { Inject, Injectable } from '@nestjs/common';
import { UpdateAuditoriaDto } from 'src/application/dto/Auditoria/update-auditoria.dto';
import { Auditoria } from 'src/domain/entities/Auditoria.entity';
import { AUDITORIA_REPOSITORY } from 'src/domain/ports/auditoria.repository';
import type { IAuditoriaRepository } from 'src/domain/ports/auditoria.repository';

@Injectable()
export class UpdateAuditoriaUseCase {
  constructor(
    @Inject(AUDITORIA_REPOSITORY)
    private readonly repository: IAuditoriaRepository,
  ) {}

  async execute(id: string, dto: UpdateAuditoriaDto): Promise<Auditoria> {
    const auditoria = new Auditoria(
      dto.dataAuditoria ? new Date(dto.dataAuditoria) : new Date(),
      '',
      '',
      dto.observacoes,
      id,
    );
    return this.repository.update(id, auditoria);
  }
}
