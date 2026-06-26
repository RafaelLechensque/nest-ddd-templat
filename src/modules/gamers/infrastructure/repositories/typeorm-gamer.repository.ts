import { InjectRepository } from '@nestjs/typeorm';
import { IGamerRepository } from '../../application/repositories/gamer-repository.interface';
import { GamerOrmEntity } from '../entities/gamer.orm-entity';
import { Repository } from 'typeorm';
import { Gamer } from '../../domain/entities/gamer.entity';
import { MembershipType } from '../../domain/enums/membership.enum';
import { GamerMapper } from '../mappers/gamer.mapper';

export class TypeormGameRepository implements IGamerRepository {
  constructor(
    @InjectRepository(GamerOrmEntity)
    private readonly repo: Repository<GamerOrmEntity>,
  ) {}

  async save(gamer: Gamer): Promise<void> {
    const ormEntity = GamerMapper.toOrm(gamer);

    await this.repo.save(ormEntity);
  }

  async findById(id: string): Promise<Gamer | null> {
    const ormEntity = await this.repo.findOneBy({ id });
    return ormEntity ? GamerMapper.toDomain(ormEntity) : null;
  }

  async findByEmail(email: string): Promise<Gamer | null> {
    const ormEntity = await this.repo.findOneBy({ email });
    return ormEntity ? GamerMapper.toDomain(ormEntity) : null;
  }

  async findAll(
    name?: string,
    email?: string,
    membership?: MembershipType,
  ): Promise<Gamer[]> {
    const query = this.repo.createQueryBuilder('gamer');

    if (name) query.andWhere('gamer.name ILIKE :name', { name: `%${name}%` });
    if (email)
      query.andWhere('gamer.email ILIKE :email', { email: `%${email}%` });
    if (membership)
      query.andWhere('gamer.membership = :membership', {
        membership,
      });

    const ormEntities = await query.getMany();
    return ormEntities.map((orm) => GamerMapper.toDomain(orm));
  }
}
