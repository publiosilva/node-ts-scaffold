import { PostModel } from '@/domain/models';
import { UpdatePostModel } from '@/domain/usecases/post';
import { UpdateRepository } from '@/data/protocols/crud';

export interface UpdatePostRepository
  extends UpdateRepository<UpdatePostModel, PostModel> { }
