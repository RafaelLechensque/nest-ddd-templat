import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PcStationOrmEntity } from '../../../pcs/infrastructure/entities/pc-station.orm-entity';
import { RoomType } from '../../domain/enums/room-type.enum';

@Entity('game_rooms')
export class GameRoomOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: RoomType,
    default: RoomType.STANDARD,
  })
  type!: RoomType;

  @OneToMany(() => PcStationOrmEntity, (pc) => pc.gameRoom)
  pcStation!: PcStationOrmEntity[];
}
