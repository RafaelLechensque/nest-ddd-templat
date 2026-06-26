import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateGamerUseCase } from '../../application/use-case/create-booking.use-case';
import { CreateGamerDto } from '../dto/create-gamer.dto';
import { ListGamerUseCase } from '../../application/use-case/list-gamer.use-case';
import { MembershipType } from '../../domain/enums/membership.enum';

@Controller('gamer')
export class GamerController {
  constructor(
    private readonly createGamerUseCase: CreateGamerUseCase,
    private readonly listGamerUseCase: ListGamerUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateGamerDto) {
    return await this.createGamerUseCase.execute(dto);
  }

  @Get('search')
  async findall(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('membershipType') membershipType?: MembershipType,
  ) {
    return await this.listGamerUseCase.execute({
      email,
      membershipType,
      name,
    });
  }
}
