import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DatabaseConnectionService } from './database/database-connection.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Validate database connection on startup
  const dbService = app.get(DatabaseConnectionService);
  try {
    await dbService.validateConnection();
    logger.log('✓ Database connection validated');
  } catch (error) {
    logger.error('Failed to validate database connection:', error);
    process.exit(1);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`✓ Application listening on port ${port}`);
}

bootstrap().catch((error) => {
  console.error('Application startup failed:', error);
  process.exit(1);
});
