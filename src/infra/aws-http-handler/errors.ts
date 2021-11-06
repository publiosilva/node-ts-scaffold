import { AWSHttpHandlerResponse } from './response';

const CODE = Symbol('code');
const NAME = Symbol('name');

export class AWSHttpHandlerHttpError extends Error {
  private readonly [CODE]: number;

  private readonly [NAME]: string;

  constructor(code: number, name: string, message: string) {
    super(message);
    this[CODE] = code;
    this[NAME] = name;
  }

  get code() {
    return this[CODE];
  }

  get name() {
    return this[NAME];
  }

  toAWSHttpHandlerResponse(): AWSHttpHandlerResponse {
    return new AWSHttpHandlerResponse(this.code, {
      name: this.name,
      message: this.message,
    });
  }

  static badRequestError(message?: string): AWSHttpHandlerHttpError {
    return new AWSHttpHandlerHttpError(400, 'BadRequestError', message || 'Bad request error');
  }

  static unauthorizedError(message?: string): AWSHttpHandlerHttpError {
    return new AWSHttpHandlerHttpError(401, 'UnauthorizedError', message || 'Unauthorized error');
  }

  static forbiddenError(message?: string): AWSHttpHandlerHttpError {
    return new AWSHttpHandlerHttpError(403, 'ForbiddenError', message || 'Forbidden error');
  }

  static notFoundError(message?: string): AWSHttpHandlerHttpError {
    return new AWSHttpHandlerHttpError(404, 'NotFoundError', message || 'Not found error');
  }

  static methodNotAllowedError(message?: string): AWSHttpHandlerHttpError {
    return new AWSHttpHandlerHttpError(405, 'MethodNotAllowedError', message || 'Method not allowed error');
  }

  static conflictError(message?: string): AWSHttpHandlerHttpError {
    return new AWSHttpHandlerHttpError(409, 'ConflictError', message || 'Conflict error');
  }

  static unprocessableEntityError(message?: string): AWSHttpHandlerHttpError {
    return new AWSHttpHandlerHttpError(422, 'UnprocessableEntityError', message || 'Unprocessable entity error');
  }

  static internalServerError(message?: string): AWSHttpHandlerHttpError {
    return new AWSHttpHandlerHttpError(500, 'InternalServerError', message || 'Internal server error');
  }
}

export function getHttpError(name: string, message: string): AWSHttpHandlerHttpError {
  const errors = new Map([
    ['BadRequestError', AWSHttpHandlerHttpError.badRequestError(message)],
    ['UnauthorizedError', AWSHttpHandlerHttpError.unauthorizedError(message)],
    ['ForbiddenError', AWSHttpHandlerHttpError.forbiddenError(message)],
    ['NotFoundError', AWSHttpHandlerHttpError.notFoundError(message)],
    ['MethodNotAllowedError', AWSHttpHandlerHttpError.methodNotAllowedError(message)],
    ['ConflictError', AWSHttpHandlerHttpError.conflictError(message)],
    ['UnprocessableEntityError', AWSHttpHandlerHttpError.unprocessableEntityError(message)],
    ['InternalServerError', AWSHttpHandlerHttpError.internalServerError(message)],
  ]);

  if (errors.has(name)) {
    return errors.get(name);
  }

  return null;
}
