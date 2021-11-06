import {
  PostModel,
  DeletePostModel,
  DeleteController,
  FindPostByIdModel,
} from './protocols';

export class DeletePostController
  extends DeleteController<DeletePostModel, FindPostByIdModel, PostModel> { }
