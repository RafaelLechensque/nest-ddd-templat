import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingSessionOrmEntity } from './entities/booking-session.orm-entity';
import { BookingController } from './controllers/booking.controller';
import { CreateBookingUseCase } from '../application/use-cases/create-booking.use-case';
import { IBookingSessionRepository } from '../application/repositories/booking-session-repository.interface';
import { TypeOrmBookingSessionRepository } from './repositories/typeorm-booking-session.repository';

@Module({
  imports: [
    // Registra a entidade do TypeORM para este módulo
    TypeOrmModule.forFeature([BookingSessionOrmEntity]),
  ],
  controllers: [BookingController],
  providers: [
    // Vinculamos o contrato (Interface/Classe Abstrata) à implementação real do TypeORM
    {
      provide: IBookingSessionRepository,
      useClass: TypeOrmBookingSessionRepository,
    },
    // Criamos o Caso de Uso injetando o repositório configurado acima
    {
      provide: CreateBookingUseCase,
      inject: [IBookingSessionRepository],
      useFactory: (repo: IBookingSessionRepository) =>
        new CreateBookingUseCase(repo),
    },
  ],
})
export class BookingsModule {}
