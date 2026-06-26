import { Controller, Get } from '@nestjs/common';
import { DatabaseConnectionService } from './database/database-connection.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly databaseConnectionService: DatabaseConnectionService,
  ) {}

  @Get('db')
  async checkDatabase() {
    return this.databaseConnectionService.healthCheck();
  }

  @Get()
  async checkHealth() {
    try {
      const dbHealth = await this.databaseConnectionService.healthCheck();
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: dbHealth,
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message: error.message,
      };
    }
  }
}
