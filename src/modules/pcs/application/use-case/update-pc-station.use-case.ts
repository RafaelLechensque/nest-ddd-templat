import { PcStation } from '../../domain/entities/pc-station.entity';
import { IPcStationRepository } from '../repositories/pc-station-repository.inteface';

export type UpdatePcInput = Partial<{
  cpu: string;
  gpu: string;
  ram: number;
  storage: number;
  isUnderMaintenance: boolean;
}>;

export class UpdatePcStationUseCase {
  constructor(private readonly repo: IPcStationRepository) {}

  async execute(
    id: string,
    updates: Partial<UpdatePcInput>,
  ): Promise<PcStation> {
    const pc = await this.repo.findById(id);

    if (!pc) throw new Error('PC não encontrado');

    // Se vierem novos dados, aplicamos. Se for undefined, mantemos o atual.
    const { cpu, gpu, ram, storage } = updates;

    if ([cpu, gpu, ram, storage].some((value) => value !== undefined)) {
      pc.updateSpecs(
        cpu ?? pc.cpu,
        gpu ?? pc.gpu,
        ram ?? pc.ram,
        storage ?? pc.storage,
      );
    }

    if (updates.isUnderMaintenance !== undefined)
      pc.markAsMaintenance(updates.isUnderMaintenance);

    await this.repo.save(pc);
    return pc;
  }
}
