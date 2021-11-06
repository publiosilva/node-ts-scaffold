import {
  PostModel, FindPostByIdModel, UpdatePostModel, UpdateController,
} from './protocols';

export class UpdatePostController
  extends UpdateController<UpdatePostModel, FindPostByIdModel, PostModel> { }
