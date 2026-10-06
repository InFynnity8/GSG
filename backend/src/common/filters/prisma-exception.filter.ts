import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '../../generated/prisma/client';

/** Maps common Prisma errors to HTTP responses instead of opaque 500s. */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const map: Record<string, [HttpStatus, string]> = {
      P2002: [HttpStatus.CONFLICT, 'A record with this value already exists'],
      P2003: [HttpStatus.CONFLICT, 'Related record constraint failed'],
      P2025: [HttpStatus.NOT_FOUND, 'Record not found'],
    };
    const [status, message] = map[exception.code] ?? [
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Database error',
    ];
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${exception.code}: ${exception.message}`,
        exception.stack,
      );
    }

    const target = (exception.meta as { target?: unknown } | undefined)?.target;
    response.status(status).json({
      statusCode: status,
      message,
      ...(exception.code === 'P2002' && target ? { fields: target } : {}),
    });
  }
}
