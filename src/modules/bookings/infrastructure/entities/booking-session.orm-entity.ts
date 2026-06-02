import { Column, Entity, PrimaryColumn } from 'typeorm/browser';
import { BookingType } from '../../domain/enums/booking-type.enum';

@Entity('booking_sessions')
export class BookingSessionOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  gamerId!: string;

  @Column()
  roomId!: string;

  @Column('varchar', { array: true })
  stationIds!: string[];

  @Column('timestamp')
  startTime!: Date;

  @Column('timestamp')
  endTime!: Date;

  @Column({ type: 'int', enum: BookingType })
  type!: BookingType;
}
