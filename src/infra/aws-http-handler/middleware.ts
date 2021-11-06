import { AWSHttpHandlerRequest } from './request';
import { AWSHttpHandlerRoute, AWSHttpHandlerRouter } from './router';

export interface AWSHttpHandlerMiddlewareExecuteParams {
  request: AWSHttpHandlerRequest;

  router: AWSHttpHandlerRouter;

  route: AWSHttpHandlerRoute;

  context: Map<string, any>;
}

export interface AWSHttpHandlerMiddleware {
  execute(
    params: AWSHttpHandlerMiddlewareExecuteParams
  ) : Promise<void>;
}
