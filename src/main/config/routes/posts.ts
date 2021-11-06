import { AWSHttpHandlerRouter } from '@/infra/aws-http-handler';
import { adaptRoute } from '@/main/adapters/aws-http-handler-route-adapter';
import {
  makeCreatePostController,
  makeDeletePostController,
  makeFindAllPostsController,
  makeFindPostByIdController,
  makeUpdatePostController,
} from '@/main/factories/controllers/post';

export function setupPostRoutes(router: AWSHttpHandlerRouter): void {
  const path = '/posts';
  const pathWithParam = `${path}/{id}`;

  router.post(path, adaptRoute(makeCreatePostController()));
  router.get(path, adaptRoute(makeFindAllPostsController()));
  router.put(pathWithParam, adaptRoute(makeUpdatePostController()));
  router.get(pathWithParam, adaptRoute(makeFindPostByIdController()));
  router.delete(pathWithParam, adaptRoute(makeDeletePostController()));
}
