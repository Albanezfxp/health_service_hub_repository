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
import { CarteiraFuncionalCreateDto } from 'src/application/dto/CarteiraFuncional/CarteiraFuncional_create.dto';
import { CarteiraFuncionalUpdateDto } from 'src/application/dto/CarteiraFuncional/CarteiraFuncional_update.dto';
import { CarteiraFuncionalMapper } from 'src/application/mapper/CarteiraFuncional.mapper';
import { CreateCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/Create-carteiraFuncional.use-case';
import { DeleteCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/Delete-carteiraFuncional.use-case';
import { FindAllCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/FindAll-carteiraFuncional.use-case';
import { FindByIdCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/FindById-carteiraFuncional.use-case';
import { UpdateCarteiraFuncionalUseCase } from 'src/application/use-cases/carteiraFuncional/Update-carteiraFuncional.use-case';

@Controller('carteiras-funcionais')
export class CarteiraFuncionalController {
  constructor(
    private createCarteiraFuncionalUseCase: CreateCarteiraFuncionalUseCase,
    private findByIdCarteiraFuncionalUseCase: FindByIdCarteiraFuncionalUseCase,
    private findAllCarteiraFuncionalUseCase: FindAllCarteiraFuncionalUseCase,
    private updateCarteiraFuncionalUseCase: UpdateCarteiraFuncionalUseCase,
    private deleteCarteiraFuncionalUseCase: DeleteCarteiraFuncionalUseCase,
  ) {}

  @Get()
  async findAll() {
    const carteiras = await this.findAllCarteiraFuncionalUseCase.execute();
    return CarteiraFuncionalMapper.toResponseList(carteiras);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const carteira = await this.findByIdCarteiraFuncionalUseCase.execute(id);
    return CarteiraFuncionalMapper.toResponse(carteira);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CarteiraFuncionalCreateDto) {
    const carteira = await this.createCarteiraFuncionalUseCase.execute(dto);
    return CarteiraFuncionalMapper.toResponse(carteira);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CarteiraFuncionalUpdateDto,
  ) {
    const carteira = await this.updateCarteiraFuncionalUseCase.execute(id, dto);
    return CarteiraFuncionalMapper.toResponse(carteira);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteCarteiraFuncionalUseCase.execute(id);
  }
}
