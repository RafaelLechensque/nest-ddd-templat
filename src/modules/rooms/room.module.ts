import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRoomOrmEntity } from './infrastructure/entities/game-room.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameRoomOrmEntity])],
})
export class GameRoomModule {}
