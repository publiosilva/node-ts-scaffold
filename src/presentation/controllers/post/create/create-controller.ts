import { PostModel, CreatePostModel, CreateController } from './protocols';

export class CreatePostController
  extends CreateController<CreatePostModel, PostModel> { }
