import { DBFindAllPosts } from '@/data/usecases/post';
import { PostCrudDynamoDBRepository } from '@/infra/repositories/post';

export function makeDBFindAllPosts(): DBFindAllPosts {
  const postCrudDynamoDBRepository = new PostCrudDynamoDBRepository();

  return new DBFindAllPosts(postCrudDynamoDBRepository);
}
