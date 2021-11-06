import { internalServerError } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';

export class ErrorHandlingControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.controller.handle(httpRequest);
    } catch (error) {
      return internalServerError(error);
    }
  }
}
