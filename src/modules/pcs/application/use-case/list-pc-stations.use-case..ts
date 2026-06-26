// src/modules/bookings/application/use-cases/list-pc-stations.use-case.ts
import { PcStation } from '../../domain/entities/pc-station.entity';
import { IPcStationRepository } from '../repositories/pc-station-repository.inteface';
import { ListPcStationsFilterInput } from './dtos/list-pc-stations-filter.dto';

export class ListPcStationsUseCase {
  constructor(private readonly pcRepository: IPcStationRepository) {}

  async execute(filters: ListPcStationsFilterInput): Promise<PcStation[]> {
    // Cenário 1: Se pediu especificamente os em manutenção
    if (filters.status === 'maintenance') {
      return await this.pcRepository.findUnderMaintenance();
    }

    // Cenário 2: Se passou filtros de hardware (CPU, GPU, etc)
    if (filters.cpu || filters.gpu || filters.ram || filters.storage) {
      return await this.pcRepository.findbyconfiguration(
        filters.cpu,
        filters.gpu,
        filters.ram,
        filters.storage,
      );
    }

    // Cenário 3: Padrão (Busca tudo)
    return await this.pcRepository.findAll();
  }
}
