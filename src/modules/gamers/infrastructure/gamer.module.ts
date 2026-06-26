import { Module } from '@nestjs/common';
import { GamerOrmEntity } from './entities/gamer.orm-entity';
import { GamerController } from './controllers/gamer.comtroller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IGamerRepository } from '../application/repositories/gamer-repository.interface';
import { TypeormGameRepository } from './repositories/typeorm-gamer.repository';
import { CreateGamerUseCase } from '../application/use-case/create-booking.use-case';
import { ListGamerUseCase } from '../application/use-case/list-gamer.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([GamerOrmEntity])],
  controllers: [GamerController],
  providers: [
    {
      provide: IGamerRepository,
      useClass: TypeormGameRepository,
    },

    {
      provide: CreateGamerUseCase,
      useFactory: (gamerRepository: IGamerRepository) => {
        return new CreateGamerUseCase(gamerRepository);
      },
      inject: [IGamerRepository],
    },
    {
      provide: ListGamerUseCase,
      useFactory: (gamerRepository: IGamerRepository) => {
        return new ListGamerUseCase(gamerRepository);
      },
      inject: [IGamerRepository],
    },
  ],
})
export class GamerModule {}
