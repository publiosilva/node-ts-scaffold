import { PostModel } from '@/domain/models';
import { FindAllRepository } from '@/data/protocols/crud';

export interface FindAllPostsRepository extends FindAllRepository<PostModel> { }
