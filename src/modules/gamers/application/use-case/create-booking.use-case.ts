import { randomUUID } from 'crypto';
import { Gamer } from '../../domain/entities/gamer.entity';
import { MembershipType } from '../../domain/enums/membership.enum';
import { IGamerRepository } from '../repositories/gamer-repository.interface';

interface CreateGamerInput {
  name: string;
  email: string;
  membership: MembershipType;
}

export class CreateGamerUseCase {
  constructor(private readonly repo: IGamerRepository) {}

  async execute(input: CreateGamerInput): Promise<Gamer> {
    const { email, membership, name } = input;

    const emailExit = await this.repo.findByEmail(email);

    if (emailExit) throw new Error('email ja registrado');

    const generatedId = randomUUID();

    const gamer = Gamer.create(generatedId, {
      email,
      membership,
      name,
    });

    await this.repo.save(gamer);

    return gamer;
  }
}
