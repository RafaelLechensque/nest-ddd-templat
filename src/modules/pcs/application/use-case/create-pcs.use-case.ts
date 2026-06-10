import { randomUUID } from 'crypto';
import { IPCStationRepository } from '../repositories/pc-station-repository.inteface';
import { PcStation } from '../../domain/entities/pc-station.entity';

export interface CreatePcStationInput {
  cpu: string;
  gpu: string;
  ram: number;
  storage: number;
}

export class CreatePcStationUseCase {
  constructor(private readonly pcStationRepository: IPCStationRepository) {}

  async execute(input: CreatePcStationInput): Promise<void> {
    const generatedId = randomUUID();

    const lastNumber = await this.pcStationRepository.getLastPcNumber();
    const newNumber = lastNumber + 1;

    const newStation = PcStation.create(generatedId, {
      number: newNumber,
      cpu: input.cpu,
      gpu: input.gpu,
      ram: input.ram,
      storage: input.storage,
      isUnderMaintenance: false,
    });

    await this.pcStationRepository.save(newStation);
  }
}
