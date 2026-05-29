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
import { CreateMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/create-medico-efetivo.use-case';
import { FindByIdMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/findById-medico-efetivo.use-case';
import { FindAllMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/findAll-medico-efetivo.use-case';
import { UpdateMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/update-medico-efetivo.use-case';
import { DeleteMedicoEfetivoUseCase } from 'src/application/use-cases/medico-efetivo/delete-medico-efetivo.use-case';
import { MedicoEfetivoMapper } from 'src/application/mapper/MedicoEfetivo.mapper';
import type { CreateMedicoEfetivoDto } from 'src/application/dto/MedicoEfetivo/create-medico-efetivo.dto';
import type { UpdateMedicoEfetivoDto } from 'src/application/dto/MedicoEfetivo/update-medico-efetivo.dto';

@Controller('medicos-efetivos')
export class MedicoEfetivoController {
  constructor(
    private createMedicoEfetivoUseCase: CreateMedicoEfetivoUseCase,
    private findByIdMedicoEfetivoUseCase: FindByIdMedicoEfetivoUseCase,
    private findAllMedicoEfetivoUseCase: FindAllMedicoEfetivoUseCase,
    private updateMedicoEfetivoUseCase: UpdateMedicoEfetivoUseCase,
    private deleteMedicoEfetivoUseCase: DeleteMedicoEfetivoUseCase,
  ) {}

  @Get()
  async findAll() {
    const efetivos = await this.findAllMedicoEfetivoUseCase.execute();
    return MedicoEfetivoMapper.toResponseList(efetivos);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const efetivo = await this.findByIdMedicoEfetivoUseCase.execute(id);
    return MedicoEfetivoMapper.toResponse(efetivo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateMedicoEfetivoDto) {
    const efetivo = await this.createMedicoEfetivoUseCase.execute(dto);
    return MedicoEfetivoMapper.toResponse(efetivo);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMedicoEfetivoDto) {
    const efetivo = await this.updateMedicoEfetivoUseCase.execute(id, dto);
    return MedicoEfetivoMapper.toResponse(efetivo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteMedicoEfetivoUseCase.execute(id);
  }
}
