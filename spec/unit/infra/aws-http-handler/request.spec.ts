import { AWSHttpHandlerRequest, AWSHttpHandlerRequestOrigin } from '@/infra/aws-http-handler/request';

describe('AWSHttpHandlerRequest', () => {
  test('should throw error if invalid method is provided', () => {
    expect(() => new AWSHttpHandlerRequest('INVALID_METHOD', '/', null, null, null, null)).toThrow('Invalid http method');
  });

  test('should return correct body parsed if content type is json', () => {
    const request = new AWSHttpHandlerRequest('GET', '/', '{"any_key":"any_value"}', new Map([['content-type', 'application/json']]), null, null);

    expect(request.bodyParsed).toEqual({ any_key: 'any_value' });
  });

  test('should return correct body parsed if content type is not json', () => {
    const request = new AWSHttpHandlerRequest('GET', '/', { any_key: 'any_value' }, null, null, null);

    expect(request.bodyParsed).toEqual({ any_key: 'any_value' });
  });

  test('should throw error if invalid event is provided', () => {
    expect(() => AWSHttpHandlerRequest.fromEvent(null)).toThrow('Invalid event');
    expect(() => AWSHttpHandlerRequest.fromEvent({})).toThrow('Invalid event');
    expect(() => AWSHttpHandlerRequest.fromEvent({ httpMethod: 'INVALID_METHOD', path: '/', headers: {} })).toThrow('Invalid event');
    expect(() => AWSHttpHandlerRequest.fromEvent({ httpMethod: 'GET', path: null, headers: {} })).toThrow('Invalid event');
    expect(() => AWSHttpHandlerRequest.fromEvent({ httpMethod: 'GET', path: '/', headers: null })).toThrow('Invalid event');
  });

  test('should get correct request origin from event if origin is api gateway', () => {
    const request = AWSHttpHandlerRequest.fromEvent({
      requestContext: {
        apiId: 'any_api_id',
      },
      httpMethod: 'GET',
      path: '/',
      queryStringParameters: {},
      headers: {},
      body: null,
      isBase64Encoded: false,
    });

    expect(request.requestOrigin).toBe(AWSHttpHandlerRequestOrigin.AWS_API_GATEWAY);
  });

  test('should get correct request origin from event if origin is elastic load balancing', () => {
    const request = AWSHttpHandlerRequest.fromEvent({
      requestContext: {
        elb: {},
      },
      httpMethod: 'GET',
      path: '/',
      queryStringParameters: {},
      headers: {},
      body: null,
      isBase64Encoded: false,
    });

    expect(request.requestOrigin).toBe(AWSHttpHandlerRequestOrigin.AWS_ELASTIC_LOAD_BALANCING);
  });

  test('should get correct request origin from event if origin is unknown', () => {
    const request = AWSHttpHandlerRequest.fromEvent({
      requestContext: {},
      httpMethod: 'GET',
      path: '/',
      queryStringParameters: {},
      headers: {},
      body: null,
      isBase64Encoded: false,
    });

    expect(request.requestOrigin).toBe(AWSHttpHandlerRequestOrigin.UNKNOWN);
  });

  test('should generate valid request from event', () => {
    const request = AWSHttpHandlerRequest.fromEvent({
      requestContext: {
        apiId: 'any_api_id',
      },
      httpMethod: 'GET',
      path: '/',
      queryStringParameters: {
        any_param: 'any_value',
      },
      headers: {
        'content-type': 'application/json',
      },
      body: '{"any_key":"any_value"}',
      isBase64Encoded: false,
    });

    expect(request.requestOrigin).toBe(AWSHttpHandlerRequestOrigin.AWS_API_GATEWAY);
    expect(request.method).toBe('GET');
    expect(request.path).toBe('/');
    expect(Array.from(request.queryParams.entries())).toEqual([['any_param', 'any_value']]);
    expect(Array.from(request.headers.entries())).toEqual([['content-type', 'application/json']]);
    expect(request.body.toString()).toBe('{"any_key":"any_value"}');
    expect(request.bodyParsed).toEqual({ any_key: 'any_value' });
    expect(request.isBase64Encoded).toBe(false);
  });

  test('should generate valid request from event without params', () => {
    const request = AWSHttpHandlerRequest.fromEvent({
      requestContext: {
        apiId: 'any_api_id',
      },
      httpMethod: 'GET',
      path: '/',
      queryStringParameters: null,
      headers: {
        'content-type': 'application/json',
      },
      body: '{"any_key":"any_value"}',
      isBase64Encoded: false,
    });

    expect(request.requestOrigin).toBe(AWSHttpHandlerRequestOrigin.AWS_API_GATEWAY);
    expect(request.method).toBe('GET');
    expect(request.path).toBe('/');
    expect(Array.from(request.params.entries())).toEqual([]);
    expect(Array.from(request.headers.entries())).toEqual([['content-type', 'application/json']]);
    expect(request.body.toString()).toBe('{"any_key":"any_value"}');
    expect(request.bodyParsed).toEqual({ any_key: 'any_value' });
    expect(request.isBase64Encoded).toBe(false);
  });

  test('should create correct body when generate request from event if is base64', () => {
    const request = AWSHttpHandlerRequest.fromEvent({
      requestContext: {
        apiId: 'any_api_id',
      },
      httpMethod: 'GET',
      path: '/',
      queryStringParameters: {
        any_param: 'any_value',
      },
      headers: {
        'content-type': 'application/json',
      },
      body: 'QQ==',
      isBase64Encoded: true,
    });

    expect(request.body.toString()).toBe('A');
  });
});
