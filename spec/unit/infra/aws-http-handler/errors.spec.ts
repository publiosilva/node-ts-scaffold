import { AWSHttpHandlerHttpError, getHttpError } from '@/infra/aws-http-handler/errors';

describe('AWSHttpHandlerHttpError', () => {
  test('should create a bad request error with default message', () => {
    const error = AWSHttpHandlerHttpError.badRequestError();

    expect(error).toBeTruthy();
    expect(error.name).toBe('BadRequestError');
    expect(error.message).toBe('Bad request error');
  });

  test('should create a bad request error with custom message', () => {
    const error = AWSHttpHandlerHttpError.badRequestError('any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('BadRequestError');
    expect(error.message).toBe('any_message');
  });

  test('should generate a response with correct data for bad request error', () => {
    const error = AWSHttpHandlerHttpError.badRequestError('any_message');
    const response = error.toAWSHttpHandlerResponse();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(400);
    expect(response.body).toBeTruthy();
    expect(response.body).toBe('{"name":"BadRequestError","message":"any_message"}');
  });

  test('should create an unauthorized error with default message', () => {
    const error = AWSHttpHandlerHttpError.unauthorizedError();

    expect(error).toBeTruthy();
    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('Unauthorized error');
  });

  test('should create an unauthorized error with custom message', () => {
    const error = AWSHttpHandlerHttpError.unauthorizedError('any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('any_message');
  });

  test('should generate a response with correct data for unauthorized error', () => {
    const error = AWSHttpHandlerHttpError.unauthorizedError('any_message');
    const response = error.toAWSHttpHandlerResponse();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeTruthy();
    expect(response.body).toBe('{"name":"UnauthorizedError","message":"any_message"}');
  });

  test('should create a forbidden error with default message', () => {
    const error = AWSHttpHandlerHttpError.forbiddenError();

    expect(error).toBeTruthy();
    expect(error.name).toBe('ForbiddenError');
    expect(error.message).toBe('Forbidden error');
  });

  test('should create a forbidden error with custom message', () => {
    const error = AWSHttpHandlerHttpError.forbiddenError('any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('ForbiddenError');
    expect(error.message).toBe('any_message');
  });

  test('should generate a response with correct data for forbidden error', () => {
    const error = AWSHttpHandlerHttpError.forbiddenError('any_message');
    const response = error.toAWSHttpHandlerResponse();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(403);
    expect(response.body).toBeTruthy();
    expect(response.body).toBe('{"name":"ForbiddenError","message":"any_message"}');
  });

  test('should create a not found error with default message', () => {
    const error = AWSHttpHandlerHttpError.notFoundError();

    expect(error).toBeTruthy();
    expect(error.name).toBe('NotFoundError');
    expect(error.message).toBe('Not found error');
  });

  test('should create a not found error with custom message', () => {
    const error = AWSHttpHandlerHttpError.notFoundError('any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('NotFoundError');
    expect(error.message).toBe('any_message');
  });

  test('should generate a response with correct data for not found error', () => {
    const error = AWSHttpHandlerHttpError.notFoundError('any_message');
    const response = error.toAWSHttpHandlerResponse();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeTruthy();
    expect(response.body).toBe('{"name":"NotFoundError","message":"any_message"}');
  });

  test('should create a method not allowed error with default message', () => {
    const error = AWSHttpHandlerHttpError.methodNotAllowedError();

    expect(error).toBeTruthy();
    expect(error.name).toBe('MethodNotAllowedError');
    expect(error.message).toBe('Method not allowed error');
  });

  test('should create a method not allowed error with custom message', () => {
    const error = AWSHttpHandlerHttpError.methodNotAllowedError('any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('MethodNotAllowedError');
    expect(error.message).toBe('any_message');
  });

  test('should generate a response with correct data for method not allowed error', () => {
    const error = AWSHttpHandlerHttpError.methodNotAllowedError('any_message');
    const response = error.toAWSHttpHandlerResponse();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(405);
    expect(response.body).toBeTruthy();
    expect(response.body).toBe('{"name":"MethodNotAllowedError","message":"any_message"}');
  });

  test('should create a conflict error with default message', () => {
    const error = AWSHttpHandlerHttpError.conflictError();

    expect(error).toBeTruthy();
    expect(error.name).toBe('ConflictError');
    expect(error.message).toBe('Conflict error');
  });

  test('should create a conflict error with custom message', () => {
    const error = AWSHttpHandlerHttpError.conflictError('any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('ConflictError');
    expect(error.message).toBe('any_message');
  });

  test('should generate a response with correct data for conflict error', () => {
    const error = AWSHttpHandlerHttpError.conflictError('any_message');
    const response = error.toAWSHttpHandlerResponse();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(409);
    expect(response.body).toBeTruthy();
    expect(response.body).toBe('{"name":"ConflictError","message":"any_message"}');
  });

  test('should create a unprocessable entity error with default message', () => {
    const error = AWSHttpHandlerHttpError.unprocessableEntityError();

    expect(error).toBeTruthy();
    expect(error.name).toBe('UnprocessableEntityError');
    expect(error.message).toBe('Unprocessable entity error');
  });

  test('should create a unprocessable entity error with custom message', () => {
    const error = AWSHttpHandlerHttpError.unprocessableEntityError('any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('UnprocessableEntityError');
    expect(error.message).toBe('any_message');
  });

  test('should generate a response with correct data for unprocessable entity error', () => {
    const error = AWSHttpHandlerHttpError.unprocessableEntityError('any_message');
    const response = error.toAWSHttpHandlerResponse();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(422);
    expect(response.body).toBeTruthy();
    expect(response.body).toBe('{"name":"UnprocessableEntityError","message":"any_message"}');
  });

  test('should create an internal server error with default message', () => {
    const error = AWSHttpHandlerHttpError.internalServerError();

    expect(error).toBeTruthy();
    expect(error.name).toBe('InternalServerError');
    expect(error.message).toBe('Internal server error');
  });

  test('should create an internal server error with custom message', () => {
    const error = AWSHttpHandlerHttpError.internalServerError('any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('InternalServerError');
    expect(error.message).toBe('any_message');
  });

  test('should generate a response with correct data for unprocessable internal server error', () => {
    const error = AWSHttpHandlerHttpError.internalServerError('any_message');
    const response = error.toAWSHttpHandlerResponse();

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(500);
    expect(response.body).toBeTruthy();
    expect(response.body).toBe('{"name":"InternalServerError","message":"any_message"}');
  });
});

describe('getHttpError', () => {
  test('should get bad request error', () => {
    const error = getHttpError('BadRequestError', 'any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('BadRequestError');
    expect(error.message).toBe('any_message');
  });

  test('should get unauthorized error', () => {
    const error = getHttpError('UnauthorizedError', 'any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('UnauthorizedError');
    expect(error.message).toBe('any_message');
  });

  test('should get forbidden error', () => {
    const error = getHttpError('ForbiddenError', 'any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('ForbiddenError');
    expect(error.message).toBe('any_message');
  });

  test('should get not found error', () => {
    const error = getHttpError('NotFoundError', 'any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('NotFoundError');
    expect(error.message).toBe('any_message');
  });

  test('should get method not allowed error', () => {
    const error = getHttpError('MethodNotAllowedError', 'any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('MethodNotAllowedError');
    expect(error.message).toBe('any_message');
  });

  test('should get conflict error', () => {
    const error = getHttpError('ConflictError', 'any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('ConflictError');
    expect(error.message).toBe('any_message');
  });

  test('should get unprocessable entity error', () => {
    const error = getHttpError('UnprocessableEntityError', 'any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('UnprocessableEntityError');
    expect(error.message).toBe('any_message');
  });

  test('should get internal server error', () => {
    const error = getHttpError('InternalServerError', 'any_message');

    expect(error).toBeTruthy();
    expect(error.name).toBe('InternalServerError');
    expect(error.message).toBe('any_message');
  });

  test('should return null if erro do not exists', () => {
    const error = getHttpError('invalid_error', 'any_message');

    expect(error).toBe(null);
  });
});
