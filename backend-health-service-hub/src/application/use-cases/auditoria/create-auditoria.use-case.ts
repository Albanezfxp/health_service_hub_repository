import { Inject, Injectable } from '@nestjs/common';
import { CreateAuditoriaDto } from 'src/application/dto/Auditoria/create-auditoria.dto';
import { AuditoriaMapper } from 'src/application/mapper/Auditoria.mapper';
import { Auditoria } from 'src/domain/entities/Auditoria.entity';
import { AUDITORIA_REPOSITORY } from 'src/domain/ports/auditoria.repository';
import type { IAuditoriaRepository } from 'src/domain/ports/auditoria.repository';

@Injectable()
export class CreateAuditoriaUseCase {
  constructor(
    @Inject(AUDITORIA_REPOSITORY)
    private readonly repository: IAuditoriaRepository,
  ) {}

  async execute(dto: CreateAuditoriaDto): Promise<Auditoria> {
    const auditoria = AuditoriaMapper.toDomain(dto);
    return this.repository.create(auditoria);
  }
}
