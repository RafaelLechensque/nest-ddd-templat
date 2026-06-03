import { Body, Controller, Post, UseFilters } from '@nestjs/common/decorators';
import { CreateBookingUseCase } from '../../application/use-cases/create-booking.use-case';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';

@Controller('bookings')
@UseFilters(DomainExceptionFilter)
export class BookingController {
  constructor(private readonly createBookingUseCase: CreateBookingUseCase) {}

  @Post()
  async create(@Body() dto: CreateBookingDto) {
    return await this.createBookingUseCase.execute(dto);
  }
}
