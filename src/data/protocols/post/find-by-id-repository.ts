import { PostModel } from '@/domain/models';
import { FindPostByIdModel } from '@/domain/usecases/post';
import { FindByIdRepository } from '@/data/protocols/crud';

export interface FindPostByIdRepository
  extends FindByIdRepository<FindPostByIdModel, PostModel> { }
