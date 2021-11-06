import { InternalServerError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/protocols';

export function formatError(error: Error) {
  const { name, message } = error;

  if (name && message) {
    return {
      name,
      message,
    };
  }

  return error;
}

export const internalServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: formatError(new InternalServerError(error.stack)),
});

export const unprocessableEntity = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: formatError(error),
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: formatError(error),
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});
