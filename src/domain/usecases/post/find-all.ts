import { PostModel } from '@/domain/models';
import { FindAll } from '@/domain/usecases/crud';

export interface FindAllPosts extends FindAll<PostModel> { }
