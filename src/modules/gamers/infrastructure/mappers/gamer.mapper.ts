import { Gamer } from '../../domain/entities/gamer.entity';
import { GamerOrmEntity } from '../entities/gamer.orm-entity';

export class GamerMapper {
  public static toOrm(domain: Gamer): GamerOrmEntity {
    const orm = new GamerOrmEntity();

    orm.id = domain.id;
    orm.name = domain.name;
    orm.email = domain.email;
    orm.membership = domain.membership;

    return orm;
  }

  public static toDomain(orm: GamerOrmEntity): Gamer {
    return Gamer.create(orm.id, {
      name: orm.name,
      email: orm.email,
      membership: orm.membership,
    });
  }
}
