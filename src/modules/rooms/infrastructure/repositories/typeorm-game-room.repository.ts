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
    const ormEntity = await this.repo.findOneBy({ id });
    return ormEntity ? GameRoomMapper.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<GameRoom[]> {
    const ormEntities = await this.repo.find();
    return ormEntities.map((orm) => GameRoomMapper.toDomain(orm));
  }

  async findByType(type: RoomType): Promise<GameRoom[]> {
    const ormEntities = await this.repo.find({ where: { type } });
    return ormEntities.map((orm) => GameRoomMapper.toDomain(orm));
  }
}
