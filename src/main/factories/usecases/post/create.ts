import { DBCreatePost } from '@/data/usecases/post';
import { PostCrudDynamoDBRepository } from '@/infra/repositories/post';

export function makeDBCreatePost(): DBCreatePost {
  const postCrudDynamoDBRepository = new PostCrudDynamoDBRepository();

  return new DBCreatePost(postCrudDynamoDBRepository);
}
