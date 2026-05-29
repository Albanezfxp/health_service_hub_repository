// src/presentation/controllers/hospital.controller.ts

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
import { HospitalCreateDto } from 'src/application/dto/Hospital/Hospital_create.dto';
import { HospitalUpdateDto } from 'src/application/dto/Hospital/Hospital_update.dto';
import { HospitalMapper } from 'src/application/mapper/Hospital.mapper';
import { CreateHospitalUseCase } from 'src/application/use-cases/hospital/Create-hospital.use-case';
import { DeleteHospitalUseCase } from 'src/application/use-cases/hospital/Delete-hospital.use-case';
import { FindAllHospitalUseCase } from 'src/application/use-cases/hospital/FindAll-hospital.use-case';
import { FindByIdHospitalUseCase } from 'src/application/use-cases/hospital/FindById-hospital.use-case';
import { UpdateHospitalUseCase } from 'src/application/use-cases/hospital/Update-hospital.use-case';

@Controller('hospitais')
export class HospitalController {
  constructor(
    private createHospitalUseCase: CreateHospitalUseCase,
    private deleteHospitalUseCase: DeleteHospitalUseCase,
    private findAllHospitalUseCase: FindAllHospitalUseCase,
    private findByIdHospitalUseCase: FindByIdHospitalUseCase,
    private updateHospitalUseCase: UpdateHospitalUseCase,
  ) {}

  @Get()
  async findAll() {
    const hospitais = await this.findAllHospitalUseCase.execute();
    return HospitalMapper.toResponseList(hospitais);
  }

  @Get(':id') // ← Remover barra desnecessária
  async findById(@Param('id') id: string) {
    // ← Mudar para string
    const hospital = await this.findByIdHospitalUseCase.execute(id);

    if (!hospital) {
      return null;
    }

    return HospitalMapper.toResponse(hospital);
  }

  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: HospitalCreateDto) {
    const hospital = await this.createHospitalUseCase.execute(dto);
    return HospitalMapper.toResponse(hospital);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: HospitalUpdateDto) {
    const hospital = await this.updateHospitalUseCase.execute(id, dto);
    return HospitalMapper.toResponse(hospital);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteHospitalUseCase.execute(id);
  }
}
