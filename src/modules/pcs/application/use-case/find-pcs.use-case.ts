import { PcStation } from '../../domain/entities/pc-station.entity';
import { IPcStationRepository } from '../repositories/pc-station-repository.inteface';

export class FindPcsUseCase {
  constructor(private readonly pcRepository: IPcStationRepository) {}

  async execute(id: string): Promise<PcStation | null> {
    return await this.pcRepository.findById(id);
  }
}
