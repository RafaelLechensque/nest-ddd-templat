import { Body, Controller, Post } from '@nestjs/common';
import { CreateGameRoomUseCase } from '../../application/use-case/create-room.use-case';
import { CreateGameRoomDto } from '../dto/create-room.dto';

@Controller('game-rooms')
export class GameRoomController {
  constructor(private readonly createGameRoomUseCase: CreateGameRoomUseCase) {}

  @Post()
  async create(@Body() dto: CreateGameRoomDto) {
    return await this.createGameRoomUseCase.execute(dto);
  }
}
