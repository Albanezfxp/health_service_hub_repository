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
import { AmbulatorioCreateDto } from 'src/application/dto/Ambulatorio/Ambulatorio-create.dto';
import { AmbulatorioUpdateDto } from 'src/application/dto/Ambulatorio/Ambulatorio-update.dto';
import { AmbulatorioMapper } from 'src/application/mapper/Ambulatorio.mapper';
import { CreateAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/Create-ambulatorio.use-case';
import { DeleteAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/Delete-ambulatorio.use-case';
import { FindAllAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/FindAll-ambulatorio.use-case';
import { FindByIdAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/FindById-ambulatorio.use-case';
import { UpdateAmbulatorioUseCase } from 'src/application/use-cases/ambulatorio/Update-ambulatorio.use-case';

@Controller('ambulatorios')
export class AmbulatorioController {
  constructor(
    private createAmbulatorioUseCase: CreateAmbulatorioUseCase,
    private findByIdAmbulatorioUseCase: FindByIdAmbulatorioUseCase,
    private findAllAmbulatorioUseCase: FindAllAmbulatorioUseCase,
    private updateAmbulatorioUseCase: UpdateAmbulatorioUseCase,
    private deleteAmbulatorioUseCase: DeleteAmbulatorioUseCase,
  ) {}

  @Get()
  async findAll() {
    const ambulatorios = await this.findAllAmbulatorioUseCase.execute();
    return AmbulatorioMapper.toResponseList(ambulatorios);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const ambulatorio = await this.findByIdAmbulatorioUseCase.execute(id);
    return AmbulatorioMapper.toResponse(ambulatorio);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: AmbulatorioCreateDto) {
    const ambulatorio = await this.createAmbulatorioUseCase.execute(dto);
    return AmbulatorioMapper.toResponse(ambulatorio);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: AmbulatorioUpdateDto) {
    const ambulatorio = await this.updateAmbulatorioUseCase.execute(id, dto);
    return AmbulatorioMapper.toResponse(ambulatorio);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteAmbulatorioUseCase.execute(id);
  }
}
