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
import { CreateMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/create-medico-residente.use-case';
import { FindByIdMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/findById-medico-residente.use-case';
import { FindAllMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/findAll-medico-residente.use-case';
import { UpdateMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/update-medico-residente.use-case';
import { DeleteMedicoResidenteUseCase } from 'src/application/use-cases/medico-residente/delete-medico-residente.use-case';
import { MedicoResidenteMapper } from 'src/application/mapper/MedicoResidente.mapper';
import type { CreateMedicoResidenteDto } from 'src/application/dto/MedicoResidente/create-medico-residente.dto';
import type { UpdateMedicoResidenteDto } from 'src/application/dto/MedicoResidente/update-medico-residente.dto';

@Controller('medicos-residentes')
export class MedicoResidenteController {
  constructor(
    private createMedicoResidenteUseCase: CreateMedicoResidenteUseCase,
    private findByIdMedicoResidenteUseCase: FindByIdMedicoResidenteUseCase,
    private findAllMedicoResidenteUseCase: FindAllMedicoResidenteUseCase,
    private updateMedicoResidenteUseCase: UpdateMedicoResidenteUseCase,
    private deleteMedicoResidenteUseCase: DeleteMedicoResidenteUseCase,
  ) {}

  @Get()
  async findAll() {
    const residentes = await this.findAllMedicoResidenteUseCase.execute();
    return MedicoResidenteMapper.toResponseList(residentes);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const residente = await this.findByIdMedicoResidenteUseCase.execute(id);
    return MedicoResidenteMapper.toResponse(residente);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateMedicoResidenteDto) {
    const residente = await this.createMedicoResidenteUseCase.execute(dto);
    return MedicoResidenteMapper.toResponse(residente);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMedicoResidenteDto) {
    const residente = await this.updateMedicoResidenteUseCase.execute(id, dto);
    return MedicoResidenteMapper.toResponse(residente);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteMedicoResidenteUseCase.execute(id);
  }
}
