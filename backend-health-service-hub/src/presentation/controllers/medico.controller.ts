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
import { MedicoCreateDto } from 'src/application/dto/Medico/Medico_create.dto';
import { MedicoUpdateDto } from 'src/application/dto/Medico/Medico_update.dto';
import { MedicoMapper } from 'src/application/mapper/Medico.mapper';
import { CreateMedicoUseCase } from 'src/application/use-cases/medico/Create-medico.use-case';
import { DeleteMedicoUseCase } from 'src/application/use-cases/medico/Delete-medico.use-case';
import { FindAllMedicoUseCase } from 'src/application/use-cases/medico/FindAll-medico.use-case';
import { FindByIdMedicoUseCase } from 'src/application/use-cases/medico/FindById-medico.use-case';
import { UpdateMedicoUseCase } from 'src/application/use-cases/medico/Update-medico.use-case';

@Controller('medicos')
export class MedicoController {
  constructor(
    private createMedicoUseCase: CreateMedicoUseCase,
    private findByIdMedicoUseCase: FindByIdMedicoUseCase,
    private findAllMedicoUseCase: FindAllMedicoUseCase,
    private updateMedicoUseCase: UpdateMedicoUseCase,
    private deleteMedicoUseCase: DeleteMedicoUseCase,
  ) {}

  @Get()
  async findAll() {
    const medicos = await this.findAllMedicoUseCase.execute();
    return MedicoMapper.toResponseList(medicos);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const medico = await this.findByIdMedicoUseCase.execute(id);
    return MedicoMapper.toResponse(medico);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: MedicoCreateDto) {
    const medico = await this.createMedicoUseCase.execute(dto);
    return MedicoMapper.toResponse(medico);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: MedicoUpdateDto) {
    const medico = await this.updateMedicoUseCase.execute(id, dto);
    return MedicoMapper.toResponse(medico);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteMedicoUseCase.execute(id);
  }
}
