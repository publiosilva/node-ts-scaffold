import { CRUDModel } from '@/domain/models';
import {
  Delete, DeleteModel, FindById, FindByIdModel,
} from '@/domain/usecases/crud';
import { NotFoundError } from '@/presentation/errors';
import { noContent, notFound } from '@/presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';

export class DeleteController<A extends DeleteModel, B extends FindByIdModel, C extends CRUDModel>
implements Controller {
  private readonly deleteUseCase: Delete<A>;

  private readonly findById: FindById<B, C>;

  constructor(deleteUseCase: Delete<A>, findById: FindById<B, C>) {
    this.deleteUseCase = deleteUseCase;
    this.findById = findById;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;
    const id = params.get('id');
    const entity = await this.findById.call(<B>{ id });

    if (!entity) {
      return notFound(new NotFoundError('Entity not found'));
    }

    await this.deleteUseCase.call(<A>{ id });

    return noContent();
  }
}
