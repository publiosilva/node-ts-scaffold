import { makeErrorHandlingControllerDecorator, makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDBFindPostById, makeDBUpdatePost } from '@/main/factories/usecases/post';
import { UpdatePostController } from '@/presentation/controllers/post';
import { Controller } from '@/presentation/protocols';
import { makeUpdatePostValidation } from './update-validation-factory';

export function makeUpdatePostController(): Controller {
  const updatePostValidation = makeUpdatePostValidation();
  const dbUpdatePost = makeDBUpdatePost();
  const dbFindPostById = makeDBFindPostById();
  const controller = new UpdatePostController(
    dbUpdatePost,
    dbFindPostById,
    updatePostValidation,
  );

  return makeErrorHandlingControllerDecorator(makeLogControllerDecorator(controller));
}
