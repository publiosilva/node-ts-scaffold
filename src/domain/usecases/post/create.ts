import { PostModel } from '@/domain/models';
import { Create, CreateModel } from '@/domain/usecases/crud';

export interface CreatePostModel extends CreateModel {
  subject: string
  body: string
}

export interface CreatePost extends Create<CreatePostModel, PostModel> { }
