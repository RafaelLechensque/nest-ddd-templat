import { Module } from '@nestjs/common';
import { PcStationOrmEntity } from './entities/pc-station.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PcStationController } from './controllers/pcs.controller';
import { IPcStationRepository } from '../application/repositories/pc-station-repository.inteface';
import { TypeormPcStationRepository } from './repositories/typeorm-pc-station.repository';
import { CreatePcStationUseCase } from '../application/use-case/create-pcs.use-case';
import { ListPcStationsUseCase } from '../application/use-case/list-pc-stations.use-case.';

@Module({
  imports: [TypeOrmModule.forFeature([PcStationOrmEntity])],
  controllers: [PcStationController],
  providers: [
    {
      provide: IPcStationRepository,
      useClass: TypeormPcStationRepository,
    },

    {
      provide: CreatePcStationUseCase,
      useFactory: (pcStationRepository: IPcStationRepository) => {
        return new CreatePcStationUseCase(pcStationRepository);
      },
      inject: [IPcStationRepository],
    },
    {
      provide: ListPcStationsUseCase,
      useFactory: (pcStationRepository: IPcStationRepository) => {
        return new ListPcStationsUseCase(pcStationRepository);
      },
      inject: [IPcStationRepository],
    },
  ],
})
export class PcsModule {}
