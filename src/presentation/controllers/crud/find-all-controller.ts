/* eslint-disable @typescript-eslint/no-unused-vars */
import { CRUDModel } from '@/domain/models';
import { FindAll } from '@/domain/usecases/crud';
import { ok } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';

export class FindAllController<A extends CRUDModel> implements Controller {
  private readonly findAll: FindAll<A>;

  constructor(findAll: FindAll<A>) {
    this.findAll = findAll;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const entities = await this.findAll.call();

    return ok(entities);
  }
}
