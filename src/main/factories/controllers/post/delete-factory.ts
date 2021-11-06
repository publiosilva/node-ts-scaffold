import { makeErrorHandlingControllerDecorator, makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDBDeletePost, makeDBFindPostById } from '@/main/factories/usecases/post';
import { DeletePostController } from '@/presentation/controllers/post';
import { Controller } from '@/presentation/protocols';

export function makeDeletePostController(): Controller {
  const dbDeletePost = makeDBDeletePost();
  const dbFindPostById = makeDBFindPostById();
  const controller = new DeletePostController(
    dbDeletePost,
    dbFindPostById,
  );

  return makeErrorHandlingControllerDecorator(makeLogControllerDecorator(controller));
}
