import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateGameRoomUseCase } from '../../application/use-case/create-room.use-case';
import { CreateGameRoomDto } from '../dto/create-room.dto';
import { ListGameRoomUseCase } from '../../application/use-case/list-game-room.use-case';
import { RoomType } from '../../domain/enums/room-type.enum';
import { UpdateGameRoomDto } from '../dto/update-room.dto';
import { UpdateGameRoomUseCase } from '../../application/use-case/update-game-room.use-case';
import { DeleteGameRoomUseCase } from '../../application/use-case/delete-game-room.use-case';

@Controller('game-rooms')
export class GameRoomController {
  constructor(
    private readonly createGameRoomUseCase: CreateGameRoomUseCase,
    private readonly listGameRoomUseCase: ListGameRoomUseCase,
    private readonly updateGameRoomUseCase: UpdateGameRoomUseCase,
    private readonly deleteGameRoomUseCase: DeleteGameRoomUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateGameRoomDto) {
    return await this.createGameRoomUseCase.execute(dto);
  }

  @Get('search')
  async findall(
    @Query('name') name?: string,
    @Query('type') type?: RoomType,
    @Query('stations_ids') stations_ids?: string | string[],
  ) {
    return await this.listGameRoomUseCase.execute({
      name,
      stations_ids: stations_ids
        ? Array.isArray(stations_ids)
          ? stations_ids
          : [stations_ids]
        : undefined,
      type,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGameRoomDto) {
    return await this.updateGameRoomUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteGameRoomUseCase.execute(id);
  }
}
