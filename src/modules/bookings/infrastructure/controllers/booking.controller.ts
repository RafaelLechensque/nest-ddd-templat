import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common/decorators';
import { CreateBookingUseCase } from '../../application/use-cases/create-booking.use-case';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';
import { ListAvailableStationsUseCase } from '../../application/use-cases/list-available-stations.use-case';

@Controller('bookings')
@UseFilters(DomainExceptionFilter)
export class BookingController {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly listAvailableStationsUseCase: ListAvailableStationsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateBookingDto) {
    return await this.createBookingUseCase.execute(dto);
  }

  @Get('available')
  async getAvailable(
    @Query('roomId') roomId: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.listAvailableStationsUseCase.execute({
      roomId,
      startTime,
      endTime,
    });
  }
}
