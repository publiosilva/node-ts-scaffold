import { CRUDModel } from '@/domain/models';
import {
  FindById, FindByIdModel, Update, UpdateModel,
} from '@/domain/usecases/crud';
import { NotFoundError } from '@/presentation/errors';
import { notFound, ok, unprocessableEntity } from '@/presentation/helpers';
import {
  Controller, HttpRequest, HttpResponse, Validation,
} from '@/presentation/protocols';

export class UpdateController<A extends UpdateModel, B extends FindByIdModel, C extends CRUDModel>
implements Controller {
  private readonly update: Update<A, C>;

  private readonly findById: FindById<B, C>;

  private readonly validation: Validation;

  constructor(
    update: Update<A, C>,
    findById: FindById<B, C>,
    validation: Validation,
  ) {
    this.update = update;
    this.findById = findById;
    this.validation = validation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body, params } = httpRequest;
    const id = params.get('id');
    const data = { ...body, id };
    const error = await this.validation.validate(data);

    if (error) {
      return unprocessableEntity(error);
    }

    const entity = await this.findById.call(<B>{ id });

    if (!entity) {
      return notFound(new NotFoundError('Entity not found'));
    }

    const updatedEntity = await this.update.call(data);

    return ok(updatedEntity);
  }
}
