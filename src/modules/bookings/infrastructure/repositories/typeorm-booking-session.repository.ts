import { Injectable } from '@nestjs/common';
import { IBookingSessionRepository } from '../../application/repositories/booking-session-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { BookingSessionOrmEntity } from '../entities/booking-session.orm-entity';
import { BookingSession } from '../../domain/entities/booking-session.entity';
import { BookingSessionMapper } from '../mappers/booking-session.mapper';
import { BookingType } from '../../domain/enums/booking-type.enum';

@Injectable()
export class TypeOrmBookingSessionRepository implements IBookingSessionRepository {
  constructor(
    @InjectRepository(BookingSessionOrmEntity)
    private readonly typeOrmRepository: Repository<BookingSessionOrmEntity>,
  ) {}

  async save(session: BookingSession): Promise<void> {
    const ormEntity = BookingSessionMapper.toOrm(session);
    await this.typeOrmRepository.save(ormEntity);
  }

  async findOverlappingStations(
    roomId: string,
    stationIds: string[],
    startTime: Date,
    endTime: Date,
  ): Promise<boolean> {
    // Cláusula de conflito de horário: (Reserva.Inicio < Input.Fim) E (Reserva.Fim > Input.Inicio)
    const query = this.typeOrmRepository
      .createQueryBuilder('booking')
      .where('booking.roomId = :roomId', { roomId })
      .andWhere('booking.startTime < :endTime', { endTime })
      .andWhere('booking.endTime > :startTime', { startTime });

    // Verifica se há conflito de PCs OU se há um campeonato ocupando a sala inteira
    query.andWhere(
      '(booking.type = :tournament OR booking.stationIds && :stationIds)',
      {
        tournament: BookingType.TOURNAMENT,
        stationIds: stationIds, // O TypeORM converte o array do JS para o array do Postgres nativamente
      },
    );

    const conflict = await query.getOne();

    return !!conflict; // Retorna true se achar algum conflito, false se estiver livre
  }

  async findOccupiedStationIds(
    roomId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<string[]> {
    // Busca todas as sessões na sala onde o horário conflita
    const sessions = await this.typeOrmRepository.find({
      where: {
        roomId,
        startTime: LessThan(endTime),
        endTime: MoreThan(startTime),
      },
    });

    // Como cada sessão tem um array de PCs, nós "achatamos" (flat) tudo em um único array
    const occupiedIds = sessions.flatMap((session) => session.stationIds);

    // Remove duplicados (caso o mesmo PC apareça em duas consultas por erro ou campeonatos)
    return [...new Set(occupiedIds)];
  }
}
