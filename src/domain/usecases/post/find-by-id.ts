import { PostModel } from '@/domain/models';
import { FindById, FindByIdModel } from '@/domain/usecases/crud';

export interface FindPostByIdModel extends FindByIdModel { }

export interface FindPostById extends FindById<FindPostByIdModel, PostModel> { }
