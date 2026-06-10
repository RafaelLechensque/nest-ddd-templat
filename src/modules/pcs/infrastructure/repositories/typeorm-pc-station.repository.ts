import { Injectable } from '@nestjs/common';
import { IPCStationRepository } from '../../application/repositories/pc-station-repository.inteface';
import { PcStationOrmEntity } from '../entities/pc-station.orm-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PcStation } from '../../domain/entities/pc-station.entity';
import { PcStationMapper } from '../mappers/pc-station.mapper';

@Injectable()
export class TypeormPcStationRepository implements IPCStationRepository {
  constructor(
    @InjectRepository(PcStationOrmEntity)
    private readonly typeOrmRepository: Repository<PcStationOrmEntity>,
  ) {}

  async save(station: PcStation): Promise<void> {
    const ormEntity = PcStationMapper.toOrm(station);
    await this.typeOrmRepository.save(ormEntity);
  }

  async findById(id: string): Promise<PcStation | null> {
    const ormEntity = await this.typeOrmRepository.findOne({ where: { id } });
    return ormEntity ? PcStationMapper.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<PcStation[]> {
    const ormEntities = await this.typeOrmRepository.find();
    return ormEntities.map((orm) => PcStationMapper.toDomain(orm));
  }

  async deleteById(id: string): Promise<void> {
    await this.typeOrmRepository.remove({ id } as PcStationOrmEntity);
  }

  async findByNumber(number: number): Promise<PcStation | null> {
    const ormEntity = await this.typeOrmRepository.findOne({
      where: { number },
    });
    return ormEntity ? PcStationMapper.toDomain(ormEntity) : null;
  }

  async findUnderMaintenance(): Promise<PcStation[]> {
    const ormEntities = await this.typeOrmRepository.find({
      where: { isUnderMaintenance: true },
    });
    return ormEntities.map((orm) => PcStationMapper.toDomain(orm));
  }

  async getLastPcNumber(): Promise<number> {
    const [lastStation] = await this.typeOrmRepository.find({
      order: { number: 'DESC' },
      take: 1,
    });
    return lastStation ? lastStation.number : 0;
  }

  async findbyconfiguration(
    cpu?: string,
    gpu?: string,
    ram?: number,
    storage?: number,
  ): Promise<PcStation[]> {
    const query = this.typeOrmRepository.createQueryBuilder('station');

    if (cpu) {
      query.andWhere('station.cpu = :cpu', { cpu });
    }
    if (gpu) {
      query.andWhere('station.gpu = :gpu', { gpu });
    }
    if (ram) {
      query.andWhere('station.ram = :ram', { ram });
    }
    if (storage) {
      query.andWhere('station.storage = :storage', { storage });
    }

    const ormEntities = await query.getMany();
    return ormEntities.map((orm) => PcStationMapper.toDomain(orm));
  }
}
