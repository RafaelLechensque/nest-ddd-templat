import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateGameRoomUseCase } from '../../application/use-case/create-room.use-case';
import { CreateGameRoomDto } from '../dto/create-room.dto';
import { ListGameRoomUseCase } from '../../application/use-case/list-game-room.use-case';
import { RoomType } from '../../domain/enums/room-type.enum';

@Controller('game-rooms')
export class GameRoomController {
  constructor(
    private readonly createGameRoomUseCase: CreateGameRoomUseCase,
    private readonly listGameRoomUseCase: ListGameRoomUseCase,
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
}
