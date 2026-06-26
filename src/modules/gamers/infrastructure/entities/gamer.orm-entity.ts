import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MembershipType } from '../../domain/enums/membership.enum';

@Entity('Gamers')
export class GamerOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({
    type: 'enum',
    enum: MembershipType,
    default: MembershipType.STANDARD,
  })
  membership!: MembershipType;
}
