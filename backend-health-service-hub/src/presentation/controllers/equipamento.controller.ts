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

import { EquipamentoMapper } from 'src/application/mapper/Equipamento.mapper';
import type { CreateEquipamentoDto } from 'src/application/dto/Equipamento/create-equipamento.dto';
import type { UpdateEquipamentoDto } from 'src/application/dto/Equipamento/update-equipamento.dto';
import { CreateEquipamentoUseCase } from 'src/application/use-cases/Equipamento/create-equipamento.use-case';
import { FindByIdEquipamentoUseCase } from 'src/application/use-cases/Equipamento/findById-equipamento.use-case';
import { FindAllEquipamentoUseCase } from 'src/application/use-cases/Equipamento/findAll-equipamento.use-case';
import { UpdateEquipamentoUseCase } from 'src/application/use-cases/Equipamento/update-equipamento.use-case';
import { DeleteEquipamentoUseCase } from 'src/application/use-cases/Equipamento/delete-equipamento.use-case';

@Controller('equipamentos')
export class EquipamentoController {
  constructor(
    private createEquipamentoUseCase: CreateEquipamentoUseCase,
    private findByIdEquipamentoUseCase: FindByIdEquipamentoUseCase,
    private findAllEquipamentoUseCase: FindAllEquipamentoUseCase,
    private updateEquipamentoUseCase: UpdateEquipamentoUseCase,
    private deleteEquipamentoUseCase: DeleteEquipamentoUseCase,
  ) {}

  @Get()
  async findAll() {
    const equipamentos = await this.findAllEquipamentoUseCase.execute();
    return EquipamentoMapper.toResponseList(equipamentos);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const equipamento = await this.findByIdEquipamentoUseCase.execute(id);
    return EquipamentoMapper.toResponse(equipamento);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateEquipamentoDto) {
    const equipamento = await this.createEquipamentoUseCase.execute(dto);
    return EquipamentoMapper.toResponse(equipamento);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEquipamentoDto) {
    const equipamento = await this.updateEquipamentoUseCase.execute(id, dto);
    return EquipamentoMapper.toResponse(equipamento);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteEquipamentoUseCase.execute(id);
  }
}
