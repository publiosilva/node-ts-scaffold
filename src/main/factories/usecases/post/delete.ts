import { DBDeletePost } from '@/data/usecases/post';
import { PostCrudDynamoDBRepository } from '@/infra/repositories/post';

export function makeDBDeletePost(): DBDeletePost {
  const postCrudDynamoDBRepository = new PostCrudDynamoDBRepository();

  return new DBDeletePost(postCrudDynamoDBRepository);
}
