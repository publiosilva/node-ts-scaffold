import { PostModel } from '@/domain/models';
import { CreatePostModel } from '@/domain/usecases/post';
import { CreateRepository } from '@/data/protocols/crud';

export interface CreatePostRepository
  extends CreateRepository<CreatePostModel, PostModel> { }
