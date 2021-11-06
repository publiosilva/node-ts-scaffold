import { EventEmitter } from 'events';
import { AWSHttpHandlerHttpError, getHttpError } from './errors';
import { AWSHttpHandlerMiddleware } from './middleware';
import { AWSHttpHandlerRequest } from './request';
import { AWSHttpHandlerResponse } from './response';
import { AWSHttpHandlerRoute, AWSHttpHandlerRouter } from './router';

const ROUTER = Symbol('router');
const REQUEST = Symbol('request');
const CONTEXT = Symbol('context');
const MIDDLEWARES = Symbol('middlewares');

export class AWSHttpHandler extends EventEmitter {
  private readonly [CONTEXT]: Map<string, any>;

  private readonly [MIDDLEWARES]: Array<AWSHttpHandlerMiddleware>;

  private readonly [ROUTER]: AWSHttpHandlerRouter;

  private readonly [REQUEST]: AWSHttpHandlerRequest;

  constructor(request: AWSHttpHandlerRequest, router: AWSHttpHandlerRouter) {
    super();
    this[CONTEXT] = new Map<string, any>();
    this[MIDDLEWARES] = new Array<AWSHttpHandlerMiddleware>();
    this[REQUEST] = request;
    this[ROUTER] = router;
  }

  get context(): Map<string, any> {
    return this[CONTEXT];
  }

  get middlewares(): Array<AWSHttpHandlerMiddleware> {
    return this[MIDDLEWARES];
  }

  get request(): AWSHttpHandlerRequest {
    return this[REQUEST];
  }

  get router(): AWSHttpHandlerRouter {
    return this[ROUTER];
  }

  private async attachMiddlewares(
    request: AWSHttpHandlerRequest,
    router: AWSHttpHandlerRouter,
    matchedRoute: AWSHttpHandlerRoute,
    context: Map<string, any>,
  ): Promise<void> {
    await Promise.all(
      this.middlewares.map(
        ((m) => m.execute({
          request, router, route: matchedRoute, context,
        })),
      ),
    );
  }

  private makeResponse(data: any): AWSHttpHandlerResponse {
    if (data instanceof AWSHttpHandlerResponse) return data;

    return new AWSHttpHandlerResponse(200, data);
  }

  private makeErrorResponse(error: Error): AWSHttpHandlerResponse {
    const { name, message } = error;

    if (name && message) {
      const httpError = getHttpError(name, message);

      if (httpError) return httpError.toAWSHttpHandlerResponse();
    }

    this.emit('internalError', error);

    return AWSHttpHandlerHttpError
      .internalServerError()
      .toAWSHttpHandlerResponse();
  }

  addMiddleware(middleware: AWSHttpHandlerMiddleware): void {
    this[MIDDLEWARES].push(middleware);
  }

  setContextEntry(key: string, value: any): void {
    this[CONTEXT].set(key, value);
  }

  async handle(): Promise<AWSHttpHandlerResponse> {
    try {
      const { context, request, router } = this;

      if (request.method === 'OPTIONS') {
        return new AWSHttpHandlerResponse(200, null, new Map(Object.entries({
          'access-control-allow-origin': '*',
          'access-control-allow-headers': 'Authorization, *',
          'access-control-allow-methods': '*',
        })));
      }

      const matchedRoute = this.router.matchRoute(request.method, request.path);

      if (!matchedRoute) {
        return AWSHttpHandlerHttpError.notFoundError().toAWSHttpHandlerResponse();
      }

      await this.attachMiddlewares(request, router, matchedRoute, context);

      const { handler, path, params } = matchedRoute;
      const data = await handler({
        request: new AWSHttpHandlerRequest(
          request.method,
          path,
          request.body,
          request.headers,
          params,
          request.queryParams,
          request.requestOrigin,
          request.isBase64Encoded,
        ),
        context,
      });

      this.emit('beforeResponse', { request, data });

      const response = this.makeResponse(data);

      this.emit('afterResponse', { request, response });

      return response;
    } catch (error) {
      this.emit('apiError', error);

      return this.makeErrorResponse(error);
    }
  }
}
