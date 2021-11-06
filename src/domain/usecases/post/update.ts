import { PostModel } from '@/domain/models';
import { Update, UpdateModel } from '@/domain/usecases/crud';

export interface UpdatePostModel extends UpdateModel {
  subject: string
  body: string
}

export interface UpdatePost extends Update<UpdatePostModel, PostModel> { }
