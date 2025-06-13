import { IBaseResponse } from '@api/interfaces';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const status = exception.getStatus
      ? exception.getStatus()
      : (exception as any).status || HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: IBaseResponse = {
      error: true,
      errorMessages: this.extractErrorMessage(exception),
      result: null,
      statusCode: status,
      timestamp: new Date().toISOString(),
    }

    response.status(status).json(errorResponse);
  }

  private extractErrorMessage(exception: T): string[] {
    const response = exception.getResponse();
    console.log('ErrorFilter: response:', response);
    
    if (typeof response === 'string') {
      return [response];
    }

    if (Array.isArray(response)) {
      return response;
    }

    if (typeof response === 'object' && response !== null) {
      return response['message'] || response['error'] || [] || Object.values(response).flat();
    }

    return [];
  }
}
