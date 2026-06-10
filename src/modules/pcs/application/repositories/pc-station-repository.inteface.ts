import { PcStation } from '../../domain/entities/pc-station.entity';

export abstract class IPCStationRepository {
  abstract save(station: PcStation): Promise<void>;

  abstract findById(id: string): Promise<PcStation | null>;

  abstract findAll(): Promise<PcStation[]>;

  abstract deleteById(id: string): Promise<void>;

  abstract findByNumber(number: number): Promise<PcStation | null>;

  abstract findUnderMaintenance(): Promise<PcStation[]>;

  abstract getLastPcNumber(): Promise<number>;

  abstract findbyconfiguration(
    cpu?: string,
    gpu?: string,
    ram?: number,
    storage?: number,
  ): Promise<PcStation[]>;
}
