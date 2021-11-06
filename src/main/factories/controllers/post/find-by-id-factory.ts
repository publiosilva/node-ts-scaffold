import { makeErrorHandlingControllerDecorator, makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDBFindPostById } from '@/main/factories/usecases/post';
import { FindPostByIdController } from '@/presentation/controllers/post';
import { Controller } from '@/presentation/protocols';

export function makeFindPostByIdController(): Controller {
  const dbFindPostById = makeDBFindPostById();
  const controller = new FindPostByIdController(dbFindPostById);

  return makeErrorHandlingControllerDecorator(makeLogControllerDecorator(controller));
}
