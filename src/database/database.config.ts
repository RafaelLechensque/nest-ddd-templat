import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get('NODE_ENV') === 'production';
  const isTesting = configService.get('NODE_ENV') === 'test';

  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST', 'localhost'),
    port: configService.get<number>('POSTGRES_PORT', 5432),
    username: configService.get('POSTGRES_USER', 'postgres'),
    password: configService.get('POSTGRES_PASSWORD', 'postgres'),
    database: configService.get('POSTGRES_DB', 'nest_ddd'),
    entities: [
      __dirname + '/**/*.entity{.ts,.js}',
      __dirname + '/**/*.orm-entity{.ts,.js}',
    ],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',
    synchronize: !isProduction && !isTesting,
    autoLoadEntities: true,
    migrationsRun: isProduction,
    logging: isProduction ? ['error', 'warn'] : ['query', 'error', 'warn'],
    logger: 'advanced-console',
    maxQueryExecutionTime: isProduction ? 1000 : undefined,
    dropSchema: false,
    poolSize: isProduction ? 20 : 5,
    connectTimeoutMS: 10000,
    ssl: isProduction
      ? {
          rejectUnauthorized: false,
        }
      : false,
  };
};
