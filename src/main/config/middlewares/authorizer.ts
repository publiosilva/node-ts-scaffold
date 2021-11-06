import { AWSHttpHandlerHttpError, AWSHttpHandlerMiddleware } from '@/infra/aws-http-handler';

class AuthorizerMiddleware implements AWSHttpHandlerMiddleware {
  async execute({ request }): Promise<void> {
    if (!request.headers.has('x-api-key')) {
      throw AWSHttpHandlerHttpError.unauthorizedError('Api key is required');
    }

    const apiKey = request.headers.get('x-api-key');

    if (apiKey !== process.env.API_KEY) {
      throw AWSHttpHandlerHttpError.unauthorizedError('Invalid api key');
    }
  }
}

export const authorizerMiddleware = new AuthorizerMiddleware();
