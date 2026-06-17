import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { GameRoomOrmEntity } from '../../../rooms/infrastructure/entities/game-room.orm-entity';

@Entity('pc_stations')
export class PcStationOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  number!: number;

  @Column()
  cpu!: string;

  @Column()
  gpu!: string;

  @Column()
  ram!: number;

  @Column()
  storage!: number;

  @Column({ default: false })
  isUnderMaintenance!: boolean;

  @ManyToOne(() => GameRoomOrmEntity, (room) => room.pcStation)
  gameRoom!: GameRoomOrmEntity;
}
