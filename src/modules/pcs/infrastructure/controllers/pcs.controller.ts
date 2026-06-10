import { Body, Controller, Post } from '@nestjs/common';
import { CreatePcStationUseCase } from '../../application/use-case/create-pcs.use-case';
import { CreatePcStationDto } from '../dtos/create-pcs.dto';

@Controller('pc-stations')
export class PcStationController {
  constructor(
    private readonly createPcStationUseCase: CreatePcStationUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreatePcStationDto) {
    return await this.createPcStationUseCase.execute(dto);
  }
}
