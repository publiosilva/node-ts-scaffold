/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AWSHttpHandler } from '@/infra/aws-http-handler/handler';
import { AWSHttpHandlerMiddleware, AWSHttpHandlerMiddlewareExecuteParams } from '@/infra/aws-http-handler/middleware';
import { AWSHttpHandlerRequest } from '@/infra/aws-http-handler/request';
import { AWSHttpHandlerResponse } from '@/infra/aws-http-handler/response';
import { AWSHttpHandlerRouter } from '@/infra/aws-http-handler/router';

class FakeMiddleware implements AWSHttpHandlerMiddleware {
  async execute(params: AWSHttpHandlerMiddlewareExecuteParams): Promise<void> {}
}

describe('AWSHttpHandler', () => {
  test('should add middleware', () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    const handler = new AWSHttpHandler(request, router);
    const middleware = new FakeMiddleware();

    handler.addMiddleware(middleware);

    expect(handler.middlewares.includes(middleware)).toBeTruthy();
  });

  test('should set context entry', () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    const handler = new AWSHttpHandler(request, router);

    handler.setContextEntry('any_key', 'any_value');

    expect(handler.context.has('any_key')).toBeTruthy();
    expect(handler.context.get('any_key')).toBe('any_value');
  });

  test('should return default response if method is options', async () => {
    const request = new AWSHttpHandlerRequest('OPTIONS', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    const handler = new AWSHttpHandler(request, router);

    const response = await handler.handle();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(null);
    expect(Array.from(response.headers.entries())).toEqual(
      [
        ['content-type', 'application/json'],
        ['access-control-allow-origin', '*'],
        ['access-control-allow-headers', 'Authorization, *'],
        ['access-control-allow-methods', '*'],
      ],
    );
  });

  test('should return not found response if no route is matched', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    const handler = new AWSHttpHandler(request, router);

    const response = await handler.handle();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe('{"name":"NotFoundError","message":"Not found error"}');
  });

  test('should execute middlewares', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    router.get('/any_path', () => {});
    const middleware = new FakeMiddleware();
    const handler = new AWSHttpHandler(request, router);
    handler.addMiddleware(middleware);

    const executeSpy = jest.spyOn(middleware, 'execute');

    await handler.handle();

    expect(executeSpy).toHaveBeenCalledTimes(1);
    const [[params]] = executeSpy.mock.calls;
    expect(params.request).toBeTruthy();
    expect(params.router).toBeTruthy();
    expect(params.route).toBeTruthy();
    expect(params.context).toBeTruthy();
  });

  test('should return correct response', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    router.get('/any_path', () => ({ any_key: 'any_value' }));
    const handler = new AWSHttpHandler(request, router);

    const response = await handler.handle();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('{"any_key":"any_value"}');
  });

  test('should return correct response if route returns AWSHttpHandlerResponse', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    router.get('/any_path', () => new AWSHttpHandlerResponse(204, null));
    const handler = new AWSHttpHandler(request, router);

    const response = await handler.handle();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(204);
    expect(response.body).toBe(null);
  });

  test('should return error response if handler throw AWSHttpHandlerHttpError error', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    router.get('/any_path', async () => {
      throw {
        name: 'ConflictError',
        message: 'any_message',
      };
    });
    const handler = new AWSHttpHandler(request, router);

    const response = await handler.handle();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(409);
    expect(response.body).toBe('{"name":"ConflictError","message":"any_message"}');
  });

  test('should return error response if handler throw non-existent AWSHttpHandlerHttpError error', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    router.get('/any_path', async () => {
      throw {
        name: 'NonExistentError',
        message: 'any_message',
      };
    });
    const handler = new AWSHttpHandler(request, router);

    const response = await handler.handle();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe('{"name":"InternalServerError","message":"Internal server error"}');
  });

  test('should return error response if handler throw generic error', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());
    const router = new AWSHttpHandlerRouter();
    router.get('/any_path', async () => {
      throw new Error();
    });
    const handler = new AWSHttpHandler(request, router);

    const response = await handler.handle();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe('{"name":"InternalServerError","message":"Internal server error"}');
  });
});
