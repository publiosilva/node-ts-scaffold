import { PostModel } from '@/domain/models';
import {
  CreatePostModel, DeletePostModel, FindPostByIdModel, UpdatePostModel,
} from '@/domain/usecases/post';
import { CrudDynamoDBRepository } from '@/infra/repositories/crud';

export class PostCrudDynamoDBRepository extends CrudDynamoDBRepository
  <
  CreatePostModel,
  DeletePostModel,
  FindPostByIdModel,
  UpdatePostModel,
  PostModel
  > {
  constructor() {
    super(process.env.POSTS_TABLE_NAME);
  }
}
