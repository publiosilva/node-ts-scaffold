import { CRUDModel } from '@/domain/models';
import { FindById, FindByIdModel } from '@/domain/usecases/crud';
import { NotFoundError } from '@/presentation/errors';
import { notFound, ok } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';

export class FindByIdController<A extends FindByIdModel, B extends CRUDModel>
implements Controller {
  private readonly findById: FindById<A, B>;

  constructor(findById: FindById<A, B>) {
    this.findById = findById;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;
    const id = params.get('id');
    const entity = await this.findById.call(<A>{ id });

    if (!entity) {
      return notFound(new NotFoundError('Entity not found'));
    }

    return ok(entity);
  }
}
