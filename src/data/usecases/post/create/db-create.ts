import {
  PostModel, CreatePostModel, DBCreate,
} from './protocols';

export class DBCreatePost
  extends DBCreate<CreatePostModel, PostModel> { }
