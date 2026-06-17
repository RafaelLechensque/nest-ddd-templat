import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePcStationUseCase } from '../../application/use-case/create-pcs.use-case';
import { CreatePcStationDto } from '../dtos/create-pcs.dto';
import { ListPcStationsUseCase } from '../../application/use-case/list-pc-stations.use-case.';
import {
  FullUpdatePcDto,
  OnlyMaintenanceUpdateDto,
  PartialUpdatePcDto,
} from '../dtos/update-pcs.dto';
import { UpdatePcStationUseCase } from '../../application/use-case/update-pc-station.use-case';
import { DeletePcStationUseCase } from '../../application/use-case/delete-pc-station.use-case';
import { FindPcsUseCase } from '../../application/use-case/find-pcs.use-case';

@Controller('pc-stations')
export class PcStationController {
  constructor(
    private readonly createPcStationUseCase: CreatePcStationUseCase,
    private readonly listPcStationsUseCase: ListPcStationsUseCase,
    private readonly updatePcUseCase: UpdatePcStationUseCase,
    private readonly deletePcStationUseCase: DeletePcStationUseCase,
    private readonly findPcsUseCase: FindPcsUseCase,
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findPcsUseCase.execute(id);
  }

  @Get('under-maintenance')
  async findAllUnderMaintenance() {
    return await this.listPcStationsUseCase.execute({ status: 'maintenance' });
  }

  // PUT: O DTO deve exigir todos os campos (usando @IsNotEmpty)
  @Put(':id')
  async replace(@Param('id') id: string, @Body() dto: FullUpdatePcDto) {
    return await this.updatePcUseCase.execute(id, dto);
  }

  // PATCH: O DTO deixa todos os campos como opcionais (@IsOptional)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: PartialUpdatePcDto) {
    return await this.updatePcUseCase.execute(id, dto);
  }

  @Patch(':id/maintenance')
  async markAsMaintenance(
    @Param('id') id: string,
    @Body() dto: OnlyMaintenanceUpdateDto,
  ) {
    return await this.updatePcUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    // Implementar lógica de exclusão usando o caso de uso correspondente
    await this.deletePcStationUseCase.execute(id);
  }
}
