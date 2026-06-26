import { Gamer } from '../../domain/entities/gamer.entity';
import { MembershipType } from '../../domain/enums/membership.enum';
import { IGamerRepository } from '../repositories/gamer-repository.interface';

interface ListGamerFilterInput {
  name?: string;
  email?: string;
  membershipType?: MembershipType;
}

export class ListGamerUseCase {
  constructor(private readonly repo: IGamerRepository) {}

  async execute(filter: ListGamerFilterInput): Promise<Gamer[]> {
    const { email, membershipType, name } = filter;
    return await this.repo.findAll(name, email, membershipType);
  }
}
