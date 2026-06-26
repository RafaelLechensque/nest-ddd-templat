import { randomUUID } from 'crypto';
import { IPcStationRepository } from '../repositories/pc-station-repository.inteface';
import { PcStation } from '../../domain/entities/pc-station.entity';

interface CreatePcStationInput {
  cpu: string;
  gpu: string;
  ram: number;
  storage: number;
}

export class CreatePcStationUseCase {
  constructor(private readonly pcStationRepository: IPcStationRepository) {}

  async execute(input: CreatePcStationInput): Promise<PcStation> {
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

    return newStation;
  }
}
