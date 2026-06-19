import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRoomOrmEntity } from './infrastructure/entities/game-room.orm-entity';
import { GameRoomController } from './infrastructure/controllers/room.controller';
import { IGameRoomRepository } from './application/repositories/game-room-repository.inteface';
import { TypeormGameRoomRepository } from './infrastructure/repositories/typeorm-game-room.repository';
import { CreateGameRoomUseCase } from './application/use-case/create-room.use-case';
import { IPcStationRepository } from '../pcs/application/repositories/pc-station-repository.inteface';
import { TypeormPcStationRepository } from '../pcs/infrastructure/repositories/typeorm-pc-station.repository';
import { PcsModule } from '../pcs/infrastructure/pcs.module';
import { PcStationOrmEntity } from '../pcs/infrastructure/entities/pc-station.orm-entity';

@Module({
  imports: [
    PcsModule,
    TypeOrmModule.forFeature([GameRoomOrmEntity, PcStationOrmEntity]),
  ],
  controllers: [GameRoomController],
  providers: [
    {
      provide: IGameRoomRepository,
      useClass: TypeormGameRoomRepository,
    },
    {
      provide: IPcStationRepository,
      useClass: TypeormPcStationRepository,
    },
    {
      provide: CreateGameRoomUseCase,
      useFactory: (
        gameRoomRepository: IGameRoomRepository,
        pcStationRepository: IPcStationRepository,
      ) => {
        return new CreateGameRoomUseCase(
          gameRoomRepository,
          pcStationRepository,
        );
      },
      inject: [IGameRoomRepository, IPcStationRepository],
    },
  ],
})
export class GameRoomModule {}
