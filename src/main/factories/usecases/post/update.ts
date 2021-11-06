import { DBUpdatePost } from '@/data/usecases/post';
import { PostCrudDynamoDBRepository } from '@/infra/repositories/post';

export function makeDBUpdatePost(): DBUpdatePost {
  const postCrudDynamoDBRepository = new PostCrudDynamoDBRepository();

  return new DBUpdatePost(postCrudDynamoDBRepository);
}
