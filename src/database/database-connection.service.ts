/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class DatabaseConnectionService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(DatabaseConnectionService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.validateConnection();
      this.logger.log('✓ Database connected successfully');
      this.logConnectionInfo();
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy();
      this.logger.log('Database connection closed');
    }
  }

  async validateConnection(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.query('SELECT NOW()');
      this.logger.log('Database connection validated');
    } finally {
      await queryRunner.release();
    }
  }

  private logConnectionInfo(): void {
    const options = this.dataSource.options as any;
    this.logger.debug(
      `Database: ${options.database} | Host: ${options.host}:${options.port}`,
    );
  }

  getRepository<T extends ObjectLiteral>(entity: any): Repository<T> {
    return this.dataSource.getRepository(entity);
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }

  async healthCheck(): Promise<{ status: string; database: string }> {
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      try {
        await queryRunner.query('SELECT NOW()');
        return {
          status: 'healthy',
          database: this.dataSource.options.database as string,
        };
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      throw new Error(`Database health check failed: ${error.message}`);
    }
  }
}
