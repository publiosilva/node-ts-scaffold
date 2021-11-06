import { AWSHttpHandlerRequest } from '@/infra/aws-http-handler';
import { authorizerMiddleware } from '@/main/config/middlewares/authorizer';

describe('AuthorizerMiddleware', () => {
  test('should throw error if no api key is provided', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map(), new Map(), new Map());

    const promise = authorizerMiddleware.execute({ request });

    await expect(promise).rejects.toThrow('Api key is required');
  });

  test('should throw error if no api key is provided', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map([['x-api-key', 'invalid_key']]), new Map(), new Map());

    const promise = authorizerMiddleware.execute({ request });

    await expect(promise).rejects.toThrow('Invalid api key');
  });

  test('should not throw error if correct api key is provided', async () => {
    const request = new AWSHttpHandlerRequest('GET', '/any_path', null, new Map([['x-api-key', process.env.API_KEY]]), new Map(), new Map());

    const promise = authorizerMiddleware.execute({ request });

    await expect(promise).resolves.not.toThrow();
  });
});
