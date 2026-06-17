import { CreatePcStationUseCase } from '../create-pcs.use-case';
import { InMemoryPcsRepository } from './in-memory-pcs.repository';

describe('CreatePcStationUseCase (Unit Tests)', () => {
  let repository: InMemoryPcsRepository;
  let sut: CreatePcStationUseCase; // SUT = System Under Test (O que estamos testando)

  beforeEach(() => {
    // Reinicia o repositório e o caso de uso antes de cada teste
    repository = new InMemoryPcsRepository();
    sut = new CreatePcStationUseCase(repository);
  });

  it('deve ser capaz de criar uma estação de PC com sucesso', async () => {
    const input = {
      cpu: 'Intel Core i7',
      gpu: 'NVIDIA RTX 3060',
      ram: 16,
      storage: 512,
    };
    const result = await sut.execute(input);

    expect(result).toHaveProperty('id');
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0].id).toBe(result.id);
    expect(repository.items[0].cpu).toBe(input.cpu);
    expect(repository.items[0].gpu).toBe(input.gpu);
    expect(repository.items[0].ram).toBe(input.ram);
    expect(repository.items[0].storage).toBe(input.storage);
    expect(repository.items[0].isUnderMaintenance).toBe(false);
    expect(repository.items[0].number).toBe(1); // Primeiro PC deve ser número 1
  });
});
