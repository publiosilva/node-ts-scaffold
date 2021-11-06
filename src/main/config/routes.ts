import { AWSHttpHandlerRouter } from '@/infra/aws-http-handler';
import { setupPostRoutes } from './routes/posts';

export function setupRoutes(router: AWSHttpHandlerRouter): void {
  setupPostRoutes(router);
}
