import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception.code == 11000) {
      response
      .status(409)
        .json({
          path: request.url,
          message: "Resource already exists",
        });
    } else {
      response
        .status(500)
        .json({
          path: request.url,
          message: exception.message,
        });
    }
  }
}