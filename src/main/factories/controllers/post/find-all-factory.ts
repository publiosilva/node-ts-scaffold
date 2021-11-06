import { makeErrorHandlingControllerDecorator, makeLogControllerDecorator } from '@/main/factories/decorators';
import { makeDBFindAllPosts } from '@/main/factories/usecases/post';
import { FindAllPostsController } from '@/presentation/controllers/post';
import { Controller } from '@/presentation/protocols';

export function makeFindAllPostsController(): Controller {
  const dbFindAllPosts = makeDBFindAllPosts();
  const controller = new FindAllPostsController(dbFindAllPosts);

  return makeErrorHandlingControllerDecorator(makeLogControllerDecorator(controller));
}
