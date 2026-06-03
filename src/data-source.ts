import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFile =
  process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';

dotenv.config({ path: envFile });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'nest_ddd',
  entities: [
    path.join(__dirname, '/**/*.entity{.ts,.js}'),
    path.join(__dirname, '/**/*.orm-entity{.ts,.js}'),
  ],
  migrations: [path.join(__dirname, '/../database/migrations/*{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
  logging: process.env.NODE_ENV === 'development',
});
