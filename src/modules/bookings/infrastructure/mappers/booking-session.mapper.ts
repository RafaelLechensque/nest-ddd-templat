import { BookingSession } from '../../domain/entities/booking-session.entity';
import { BookingSessionOrmEntity } from '../entities/booking-session.orm-entity';

export class BookingSessionMapper {
  // Converte Domínio -> Banco
  public static toOrm(domain: BookingSession): BookingSessionOrmEntity {
    const orm = new BookingSessionOrmEntity();
    orm.id = domain.id;
    orm.gamerId = domain.roomId; // Expondo através de getters se necessário
    orm.roomId = domain.roomId;
    orm.stationIds = domain.stationIds;
    orm.startTime = domain.startTime;
    orm.endTime = domain.endTime;
    orm.type = domain.type;
    return orm;
  }

  // Converte Banco -> Domínio
  public static toDomain(orm: BookingSessionOrmEntity): BookingSession {
    return BookingSession.create(orm.id, {
      gamerId: orm.gamerId,
      roomId: orm.roomId,
      stationIds: orm.stationIds,
      startTime: orm.startTime,
      endTime: orm.endTime,
      type: orm.type,
    });
  }
}
