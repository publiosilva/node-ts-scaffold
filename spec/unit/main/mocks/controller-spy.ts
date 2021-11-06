import { ok } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';

export class ControllerSpy implements Controller {
  response: any = ok('any_response');

  request: any;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.request = httpRequest;

    return this.response;
  }
}
