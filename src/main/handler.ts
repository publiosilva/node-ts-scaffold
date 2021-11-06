import {
  AWSHttpHandler, AWSHttpHandlerRequest, AWSHttpHandlerRouter,
} from '@/infra/aws-http-handler';
import { setupMiddlewares } from './config/middlewares';
import { setupRoutes } from './config/routes';

export async function handle(event: any): Promise<any> {
  // eslint-disable-next-line no-console
  console.log(event);

  const prefix = process.env.PREFIX;
  const request = AWSHttpHandlerRequest.fromEvent(event);
  const router = new AWSHttpHandlerRouter(prefix);
  const handler = new AWSHttpHandler(request, router);

  setupMiddlewares(handler);
  setupRoutes(router);

  const response = await handler.handle();

  return response.toEvent();
}
