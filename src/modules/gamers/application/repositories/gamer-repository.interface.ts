import { Gamer } from '../../domain/entities/gamer.entity';
import { MembershipType } from '../../domain/enums/membership.enum';

export abstract class IGamerRepository {
  abstract save(gamer: Gamer): Promise<void>;

  abstract findById(id: string): Promise<Gamer | null>;

  abstract findByEmail(email: string): Promise<Gamer | null>;

  abstract findAll(
    name?: string,
    email?: string,
    membership?: MembershipType,
  ): Promise<Gamer[]>;
}
