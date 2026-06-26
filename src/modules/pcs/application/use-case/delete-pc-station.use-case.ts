import { IPcStationRepository } from '../repositories/pc-station-repository.inteface';

export class DeletePcStationUseCase {
  constructor(private readonly pcRepository: IPcStationRepository) {}

  async execute(id: string): Promise<void> {
    const pc = await this.pcRepository.findById(id);
    if (!pc) {
      throw new Error('Pc station not found');
    }
    await this.pcRepository.deleteById(id);
  }
}
