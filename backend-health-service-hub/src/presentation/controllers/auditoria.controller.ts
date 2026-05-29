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
import { CreateAuditoriaUseCase } from 'src/application/use-cases/auditoria/create-auditoria.use-case';
import { FindByIdAuditoriaUseCase } from 'src/application/use-cases/auditoria/findById-auditoria.use-case';
import { FindAllAuditoriaUseCase } from 'src/application/use-cases/auditoria/findAll-auditoria.use-case';
import { UpdateAuditoriaUseCase } from 'src/application/use-cases/auditoria/update-auditoria.use-case';
import { DeleteAuditoriaUseCase } from 'src/application/use-cases/auditoria/delete-auditoria.use-case';
import { AuditoriaMapper } from 'src/application/mapper/Auditoria.mapper';
import type { CreateAuditoriaDto } from 'src/application/dto/Auditoria/create-auditoria.dto';
import type { UpdateAuditoriaDto } from 'src/application/dto/Auditoria/update-auditoria.dto';

@Controller('auditorias')
export class AuditoriaController {
  constructor(
    private createAuditoriaUseCase: CreateAuditoriaUseCase,
    private findByIdAuditoriaUseCase: FindByIdAuditoriaUseCase,
    private findAllAuditoriaUseCase: FindAllAuditoriaUseCase,
    private updateAuditoriaUseCase: UpdateAuditoriaUseCase,
    private deleteAuditoriaUseCase: DeleteAuditoriaUseCase,
  ) {}

  @Get()
  async findAll() {
    const auditorias = await this.findAllAuditoriaUseCase.execute();
    return AuditoriaMapper.toResponseList(auditorias);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const auditoria = await this.findByIdAuditoriaUseCase.execute(id);
    return AuditoriaMapper.toResponse(auditoria);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAuditoriaDto) {
    const auditoria = await this.createAuditoriaUseCase.execute(dto);
    return AuditoriaMapper.toResponse(auditoria);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAuditoriaDto) {
    const auditoria = await this.updateAuditoriaUseCase.execute(id, dto);
    return AuditoriaMapper.toResponse(auditoria);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteAuditoriaUseCase.execute(id);
  }
}
