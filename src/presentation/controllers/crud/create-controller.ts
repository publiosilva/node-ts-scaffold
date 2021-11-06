import { CRUDModel } from '@/domain/models';
import { Create, CreateModel } from '@/domain/usecases/crud';
import { created, unprocessableEntity } from '@/presentation/helpers';
import {
  Controller, HttpRequest, HttpResponse, Validation,
} from '@/presentation/protocols';

export class CreateController<A extends CreateModel, B extends CRUDModel> implements Controller {
  private readonly create: Create<A, B>;

  private readonly validation: Validation;

  constructor(create: Create<A, B>, validation: Validation) {
    this.create = create;
    this.validation = validation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest;
    const error = await this.validation.validate(body);

    if (error) {
      return unprocessableEntity(error);
    }

    const entity = await this.create.call(body);

    return created(entity);
  }
}
