import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
