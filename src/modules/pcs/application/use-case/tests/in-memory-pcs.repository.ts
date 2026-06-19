/* eslint-disable @typescript-eslint/require-await */
import { PcStation } from '../../../domain/entities/pc-station.entity';
import { IPcStationRepository } from '../../repositories/pc-station-repository.inteface';

export class InMemoryPcsRepository implements IPcStationRepository {
  public items: PcStation[] = [];

  async findByIds(ids: string[]): Promise<PcStation[]> {
    return this.items.filter((pc) => ids.includes(pc.id));
  }
  async save(pc: PcStation): Promise<void> {
    this.items.push(pc);
  }

  async deleteById(id: string): Promise<void> {
    this.items = this.items.filter((pc) => pc.id !== id);
  }

  async findAll(): Promise<PcStation[]> {
    return this.items;
  }

  async findById(id: string): Promise<PcStation | null> {
    return this.items.find((pc) => pc.id === id) || null;
  }

  async findByNumber(number: number): Promise<PcStation | null> {
    return this.items.find((pc) => pc.number === number) || null;
  }

  async findUnderMaintenance(): Promise<PcStation[]> {
    return this.items.filter((pc) => pc.isUnderMaintenance);
  }

  async findbyconfiguration(
    cpu?: string,
    gpu?: string,
    ram?: number,
    storage?: number,
  ): Promise<PcStation[]> {
    return this.items.filter((pc) => {
      if (cpu && pc.cpu !== cpu) return false;
      if (gpu && pc.gpu !== gpu) return false;
      if (ram && pc.ram !== ram) return false;
      if (storage && pc.storage !== storage) return false;
      return true;
    });
  }

  async getLastPcNumber(): Promise<number> {
    const lastPc = this.items.reduce(
      (latest, current) => {
        return current.number > latest.number ? current : latest;
      },
      this.items[0] || { number: 0 },
    );
    return lastPc.number;
  }
}
