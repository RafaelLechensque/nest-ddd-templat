import { Repository } from 'typeorm';
import { IGameRoomRepository } from '../../application/repositories/game-room-repository.inteface';
import { GameRoomOrmEntity } from '../entities/game-room.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRoom } from '../../domain/entities/game-room.entity';
import { RoomType } from '../../domain/enums/room-type.enum';
import { GameRoomMapper } from '../mappers/game-room.mapper';

export class TypeormGameRoomRepository implements IGameRoomRepository {
  constructor(
    @InjectRepository(GameRoomOrmEntity)
    private readonly repo: Repository<GameRoomOrmEntity>,
  ) {}

  async save(room: GameRoom): Promise<void> {
    const ormEntity = GameRoomMapper.toOrm(room);
    await this.repo.save(ormEntity);
  }

  async findByid(id: string): Promise<GameRoom | null> {
    const ormEntity = await this.repo.findOne({
      where: { id },
      relations: {
        pcStation: true,
      },
    });
    return ormEntity ? GameRoomMapper.toDomain(ormEntity) : null;
  }

  async findAll(
    name?: string,
    type?: RoomType,
    stations_ids?: string[],
  ): Promise<GameRoom[]> {
    console.log(stations_ids, typeof stations_ids);
    console.log(Array.isArray(stations_ids));
    const query = this.repo
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.pcStation', 'pcStation');

    if (name) query.andWhere('room.name ILIKE :name', { name: `%${name}%` });
    if (type) query.andWhere('room.type = :type', { type });
    if (stations_ids?.length) {
      query
        .innerJoin('room.pcStation', 'game_rooms')
        .andWhere('game_rooms.id IN (:...stations_ids)', {
          stations_ids,
        });
    }

    const ormEntities = await query.getMany();
    return ormEntities.map((orm) => GameRoomMapper.toDomain(orm));
  }

  // async findByType(type: RoomType): Promise<GameRoom[]> {
  //   const ormEntities = await this.repo.find({ where: { type } });
  //   return ormEntities.map((orm) => GameRoomMapper.toDomain(orm));
  // }
}
