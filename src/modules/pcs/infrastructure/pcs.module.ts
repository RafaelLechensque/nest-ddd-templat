import { Module } from '@nestjs/common';
import { PcStationOrmEntity } from './entities/pc-station.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PcStationController } from './controllers/pcs.controller';
import { IPCStationRepository } from '../application/repositories/pc-station-repository.inteface';
import { TypeormPcStationRepository } from './repositories/typeorm-pc-station.repository';
import { CreatePcStationUseCase } from '../application/use-case/create-pcs.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PcStationOrmEntity])],
  controllers: [PcStationController],
  providers: [
    {
      provide: IPCStationRepository,
      useClass: TypeormPcStationRepository,
    },

    {
      provide: CreatePcStationUseCase,
      useFactory: (pcStationRepository: IPCStationRepository) => {
        return new CreatePcStationUseCase(pcStationRepository);
      },
      inject: [IPCStationRepository],
    },
  ],
})
export class PcsModule {}
