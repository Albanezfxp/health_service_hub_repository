import { Inject, Injectable } from '@nestjs/common';
import { REQUISICAO_EQUIPAMENTO_REPOSITORY } from 'src/domain/ports/requisicao-equipamento.repository';
import type { IRequisicaoEquipamentoRepository } from 'src/domain/ports/requisicao-equipamento.repository';
import { RequisicaoEquipamento } from 'src/domain/entities/RequisicaoEquipamento.entity';
import { RequisicaoEquipamentoMapper } from 'src/application/mapper/RequisicaoEquipamento.mapper';
import type { CreateRequisicaoEquipamentoDto } from 'src/application/dto/RequisicaoEquipamento/create-requisicao-equipamento.dto';

@Injectable()
export class CreateRequisicaoEquipamentoUseCase {
  constructor(
    @Inject(REQUISICAO_EQUIPAMENTO_REPOSITORY)
    private readonly repository: IRequisicaoEquipamentoRepository,
  ) {}

  async execute(
    dto: CreateRequisicaoEquipamentoDto,
  ): Promise<RequisicaoEquipamento> {
    const requisicao = RequisicaoEquipamentoMapper.toDomain(dto);
    return this.repository.create(requisicao);
  }
}
