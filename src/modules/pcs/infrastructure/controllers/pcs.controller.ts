import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePcStationUseCase } from '../../application/use-case/create-pcs.use-case';
import { CreatePcStationDto } from '../dtos/create-pcs.dto';
import { ListPcStationsUseCase } from '../../application/use-case/list-pc-stations.use-case.';

@Controller('pc-stations')
export class PcStationController {
  constructor(
    private readonly createPcStationUseCase: CreatePcStationUseCase,
    private readonly listPcStationsUseCase: ListPcStationsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreatePcStationDto) {
    return await this.createPcStationUseCase.execute(dto);
  }

  @Get('search')
  async findAll(
    @Query('cpu') cpu?: string,
    @Query('gpu') gpu?: string,
    @Query('ram') ram?: string, // Queries vêm como string do HTTP
    @Query('storage') storage?: string,
  ) {
    return await this.listPcStationsUseCase.execute({
      cpu,
      gpu,
      ram: ram ? Number(ram) : undefined,
      storage: storage ? Number(storage) : undefined,
    });
  }

  @Get('under-maintenance')
  async findAllUnderMaintenance() {
    return await this.listPcStationsUseCase.execute({ status: 'maintenance' });
  }
}
