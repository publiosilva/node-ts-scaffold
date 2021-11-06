import { AWSHttpHandlerResponse } from '@/infra/aws-http-handler/response';

describe('AWSHttpHandlerResponse', () => {
  test('should create response with correct headers', () => {
    const response = new AWSHttpHandlerResponse(200, null, new Map([['any_key', 'any_value']]));

    expect(response.headers).toBeTruthy();
    expect(response.headers.has('any_key')).toBeTruthy();
    expect(response.headers.get('any_key')).toBe('any_value');
    expect(response.headers.has('content-type')).toBeTruthy();
    expect(response.headers.get('content-type')).toBe('application/json');
    expect(response.headers.has('access-control-allow-origin')).toBeTruthy();
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
  });

  test('should create response with default headers if headers is null', () => {
    const response = new AWSHttpHandlerResponse(200, null, null);

    expect(response.headers).toBeTruthy();
    expect(response.headers.has('content-type')).toBeTruthy();
    expect(response.headers.get('content-type')).toBe('application/json');
    expect(response.headers.has('access-control-allow-origin')).toBeTruthy();
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
  });

  test('should return true if content-type is json', () => {
    const response = new AWSHttpHandlerResponse(200, null);

    expect(response.isJson).toBe(true);
  });

  test('should return false if content-type is not json', () => {
    const response = new AWSHttpHandlerResponse(200, null, new Map([['content-type', 'application/xml']]));

    expect(response.isJson).toBe(false);
  });

  test('should return right body if is base64 encoded', () => {
    const response = new AWSHttpHandlerResponse(200, Buffer.from('A'), new Map(), true);

    expect(response.body).toBe('QQ==');
  });

  test('should return right body if is json', () => {
    const response = new AWSHttpHandlerResponse(200, { any_key: 'any_value' });

    expect(response.body).toBe('{"any_key":"any_value"}');
  });

  test('should return right body if body is a buffer and is not json', () => {
    const response = new AWSHttpHandlerResponse(200, Buffer.from('A'), new Map([['content-type', 'application/xml']]));

    expect(response.body).toBe('A');
  });

  test('should return right body if body is not a buffer and is not json', () => {
    const response = new AWSHttpHandlerResponse(200, 0, new Map([['content-type', 'application/xml']]));

    expect(response.body).toBe(0);
  });

  test('should generate event from response', () => {
    const response = new AWSHttpHandlerResponse(200, { any_key: 'any_value' });

    const event = response.toEvent();

    expect(event).toBeTruthy();
    expect(event.statusCode).toBe(200);
    expect(event.body).toBe('{"any_key":"any_value"}');
    expect(event.headers).toEqual({
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    });
    expect(event.isBase64Encoded).toBe(false);
  });
});
