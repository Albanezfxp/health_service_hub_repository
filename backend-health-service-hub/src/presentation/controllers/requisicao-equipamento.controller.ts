// src/presentation/controllers/requisicao-equipamento.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/create-requisicao-equipamento.use-case';
import { FindByIdRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/findById-requisicao-equipamento.use-case';
import { FindAllRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/findAll-requisicao-equipamento.use-case';
import { UpdateRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/update-requisicao-equipamento.use-case';
import { DeleteRequisicaoEquipamentoUseCase } from 'src/application/use-cases/requisicao-equipamento/delete-requisicao-equipamento.use-case';
import { RequisicaoEquipamentoMapper } from 'src/application/mapper/RequisicaoEquipamento.mapper';
import type { CreateRequisicaoEquipamentoDto } from 'src/application/dto/RequisicaoEquipamento/create-requisicao-equipamento.dto';
import type { UpdateRequisicaoEquipamentoDto } from 'src/application/dto/RequisicaoEquipamento/update-requisicao-equipamento.dto';

@Controller('requisicoes-equipamentos')
export class RequisicaoEquipamentoController {
  constructor(
    private createRequisicaoEquipamentoUseCase: CreateRequisicaoEquipamentoUseCase,
    private findByIdRequisicaoEquipamentoUseCase: FindByIdRequisicaoEquipamentoUseCase,
    private findAllRequisicaoEquipamentoUseCase: FindAllRequisicaoEquipamentoUseCase,
    private updateRequisicaoEquipamentoUseCase: UpdateRequisicaoEquipamentoUseCase,
    private deleteRequisicaoEquipamentoUseCase: DeleteRequisicaoEquipamentoUseCase,
  ) {}

  @Get()
  async findAll() {
    const requisicoes =
      await this.findAllRequisicaoEquipamentoUseCase.execute();
    return RequisicaoEquipamentoMapper.toResponseList(requisicoes);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const requisicao =
      await this.findByIdRequisicaoEquipamentoUseCase.execute(id);
    return RequisicaoEquipamentoMapper.toResponse(requisicao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRequisicaoEquipamentoDto) {
    const requisicao =
      await this.createRequisicaoEquipamentoUseCase.execute(dto);
    return RequisicaoEquipamentoMapper.toResponse(requisicao);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRequisicaoEquipamentoDto,
  ) {
    const requisicao = await this.updateRequisicaoEquipamentoUseCase.execute(
      id,
      dto,
    );
    return RequisicaoEquipamentoMapper.toResponse(requisicao);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteRequisicaoEquipamentoUseCase.execute(id);
  }
}
