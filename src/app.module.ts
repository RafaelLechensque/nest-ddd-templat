import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './database/database.config';
import { DatabaseConnectionService } from './database/database-connection.service';
import { HealthController } from './health.controller';
import { BookingsModule } from './modules/bookings/infrastructure/bookings.module';
import { PcsModule } from './modules/pcs/infrastructure/pcs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env',
      ],
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    BookingsModule,
    PcsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, DatabaseConnectionService],
  exports: [DatabaseConnectionService],
})
export class AppModule {}
