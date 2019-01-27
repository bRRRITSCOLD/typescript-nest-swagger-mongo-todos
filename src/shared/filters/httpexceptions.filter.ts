import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { APIError } from 'src/models/errors';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException | APIError | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(exception.statusCode)
      .json(exception);
  }
}
