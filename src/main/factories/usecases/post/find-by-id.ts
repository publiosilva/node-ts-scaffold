import { DBFindPostById } from '@/data/usecases/post';
import { PostCrudDynamoDBRepository } from '@/infra/repositories/post';

export function makeDBFindPostById(): DBFindPostById {
  const postCrudDynamoDBRepository = new PostCrudDynamoDBRepository();

  return new DBFindPostById(postCrudDynamoDBRepository);
}
