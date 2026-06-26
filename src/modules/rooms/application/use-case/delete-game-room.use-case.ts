import { IGameRoomRepository } from '../repositories/game-room-repository.inteface';

export class DeleteGameRoomUseCase {
  constructor(private readonly repo: IGameRoomRepository) {}

  async execute(id: string): Promise<void> {
    const room = await this.repo.findByid(id);

    if (!room) throw new Error('Game Room not found');

    await this.repo.delete(id);
  }
}
