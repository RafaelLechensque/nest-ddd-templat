import { PcStation } from '../../domain/entities/pc-station.entity';

export abstract class IPcStationRepository {
  abstract save(station: PcStation): Promise<void>;

  abstract deleteById(id: string): Promise<void>;

  abstract findById(id: string): Promise<PcStation | null>;

  abstract findByNumber(number: number): Promise<PcStation | null>;

  abstract getLastPcNumber(): Promise<number>;

  abstract findAll(): Promise<PcStation[]>;

  abstract findUnderMaintenance(): Promise<PcStation[]>;

  abstract findbyconfiguration(
    cpu?: string,
    gpu?: string,
    ram?: number,
    storage?: number,
  ): Promise<PcStation[]>;
}
