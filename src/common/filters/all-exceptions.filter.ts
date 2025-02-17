import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface ExceptionResponse {
  message?: string;
  error?: unknown;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let exceptionResponse: ExceptionResponse = { error: exception };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      exceptionResponse = exception.getResponse() as ExceptionResponse;
    }

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse.message || 'Internal server error';

    const error = exceptionResponse.error ?? exception;

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }
}
