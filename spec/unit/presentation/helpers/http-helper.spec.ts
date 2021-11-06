import { InvalidParamError, MissingParamError, NotFoundError } from '@/presentation/errors';
import {
  created, formatError, noContent, notFound, ok, unprocessableEntity,
} from '@/presentation/helpers/http-helper';

describe('Http Helper', () => {
  test('Should format error', () => {
    const error = new InvalidParamError('any_param');

    expect(formatError(error)).toEqual({
      name: error.name,
      message: error.message,
    });
  });

  test('Should format generic error', () => {
    const error = new Error();

    expect(formatError(error)).toBe(error);
  });

  test('Should return a 422 response', () => {
    const error = new MissingParamError('any_param');
    const response = unprocessableEntity(error);

    expect(response).toEqual({
      statusCode: 422,
      body: {
        name: error.name,
        message: error.message,
      },
    });
  });

  test('Should return a 404 response', () => {
    const error = new NotFoundError('any_message');
    const response = notFound(error);

    expect(response).toEqual({
      statusCode: 404,
      body: {
        name: error.name,
        message: error.message,
      },
    });
  });

  test('Should return a 204 response', () => {
    const response = noContent();

    expect(response).toEqual({
      statusCode: 204,
      body: null,
    });
  });

  test('Should return a 201 response', () => {
    const response = created('any_data');

    expect(response).toEqual({
      statusCode: 201,
      body: 'any_data',
    });
  });

  test('Should return a 200 response', () => {
    const response = ok('any_data');

    expect(response).toEqual({
      statusCode: 200,
      body: 'any_data',
    });
  });
});
