import { makeErrorHandlingControllerDecorator, makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDBCreatePost } from '@/main/factories/usecases/post';
import { CreatePostController } from '@/presentation/controllers/post';
import { Controller } from '@/presentation/protocols';
import { makeCreatePostValidation } from './create-validation-factory';

export function makeCreatePostController(): Controller {
  const dbCreatePost = makeDBCreatePost();
  const createPostValidation = makeCreatePostValidation();
  const controller = new CreatePostController(dbCreatePost, createPostValidation);

  return makeErrorHandlingControllerDecorator(makeLogControllerDecorator(controller));
}
