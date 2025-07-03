import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  BadRequestException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as any;
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exceptionResponse.message || 'Validation failed',
      errors: exceptionResponse.errors || [],
      details: 'Request validation failed. Please check your input data.',
    });
  }
}