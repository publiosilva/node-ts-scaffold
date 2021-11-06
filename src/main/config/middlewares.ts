import { AWSHttpHandler } from '@/infra/aws-http-handler';
import { authorizerMiddleware } from './middlewares/authorizer';

export function setupMiddlewares(handler: AWSHttpHandler): void {
  handler.addMiddleware(authorizerMiddleware);
}
