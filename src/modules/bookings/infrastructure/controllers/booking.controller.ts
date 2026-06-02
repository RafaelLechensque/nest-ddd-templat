import { Body, Controller, Post } from '@nestjs/common/decorators';
import { CreateBookingUseCase } from '../../application/use-cases/create-booking.use-case';
import type { CreateBookingInput } from '../../application/use-cases/create-booking.use-case';
import { BadRequestException } from '@nestjs/common';

@Controller('bookings')
export class BookingController {
  constructor(private readonly createBookingUseCase: CreateBookingUseCase) {}

  @Post()
  async create(@Body() body: CreateBookingInput) {
    try {
      const result = await this.createBookingUseCase.execute(body);
      return { success: true, data: result };
    } catch (error: unknown) {
      // Qualquer erro de regra de negócio do domínio vira um 400 Bad Request automaticamente
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unexpected error occurred');
    }
  }
}
