import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.controller.handle(httpRequest);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      throw error;
    }
  }
}
