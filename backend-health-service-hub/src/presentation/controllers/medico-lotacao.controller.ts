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
  Query,
} from '@nestjs/common';
import { CreateMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/create-medico-lotacao.use-case';
import { FindByIdMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/findById-medico-lotacao.use-case';
import { FindAllMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/findAll-medico-lotacao.use-case';
import { UpdateMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/update-medico-lotacao.use-case';
import { DeleteMedicoLotacaoUseCase } from 'src/application/use-cases/medico-lotacao/delete-medico-lotacao.use-case';
import { MedicoLotacaoMapper } from 'src/application/mapper/MedicoLotacao.mapper';
import type { CreateMedicoLotacaoDto } from 'src/application/dto/MedicoLotacao/create-medico-lotacao.dto';
import type { UpdateMedicoLotacaoDto } from 'src/application/dto/MedicoLotacao/update-medico-lotacao.dto';

@Controller('medicos-lotacoes')
export class MedicoLotacaoController {
  constructor(
    private createMedicoLotacaoUseCase: CreateMedicoLotacaoUseCase,
    private findByIdMedicoLotacaoUseCase: FindByIdMedicoLotacaoUseCase,
    private findAllMedicoLotacaoUseCase: FindAllMedicoLotacaoUseCase,
    private updateMedicoLotacaoUseCase: UpdateMedicoLotacaoUseCase,
    private deleteMedicoLotacaoUseCase: DeleteMedicoLotacaoUseCase,
  ) {}

  @Get()
  async findAll() {
    const lotacoes = await this.findAllMedicoLotacaoUseCase.execute();
    return MedicoLotacaoMapper.toResponseList(lotacoes);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const lotacao = await this.findByIdMedicoLotacaoUseCase.execute(id);
    return MedicoLotacaoMapper.toResponse(lotacao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateMedicoLotacaoDto) {
    const lotacao = await this.createMedicoLotacaoUseCase.execute(dto);
    return MedicoLotacaoMapper.toResponse(lotacao);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMedicoLotacaoDto) {
    const lotacao = await this.updateMedicoLotacaoUseCase.execute(id, dto);
    return MedicoLotacaoMapper.toResponse(lotacao);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteMedicoLotacaoUseCase.execute(id);
  }
}
