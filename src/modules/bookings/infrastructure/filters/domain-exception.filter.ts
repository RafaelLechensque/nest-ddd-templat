import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../../../../shared/domain/exceptions/domain.exception';

@Catch(DomainException) // O NestJS só vai capturar erros que herdem de DomainException
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Regra de Negócio Violada',
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
