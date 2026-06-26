import { PcStation } from '../../domain/entities/pc-station.entity';
import { PcStationOrmEntity } from '../entities/pc-station.orm-entity';

export class PcStationMapper {
  public static toOrm(domain: PcStation): PcStationOrmEntity {
    const orm = new PcStationOrmEntity();
    orm.id = domain.id;
    orm.number = domain.number;
    orm.cpu = domain.cpu;
    orm.gpu = domain.gpu;
    orm.ram = domain.ram;
    orm.storage = domain.storage;
    orm.isUnderMaintenance = domain.isUnderMaintenance ?? false;
    return orm;
  }

  public static toDomain(orm: PcStationOrmEntity): PcStation {
    return PcStation.create(orm.id, {
      number: orm.number,
      cpu: orm.cpu,
      gpu: orm.gpu,
      ram: orm.ram,
      storage: orm.storage,
      isUnderMaintenance: orm.isUnderMaintenance,
    });
  }
}
