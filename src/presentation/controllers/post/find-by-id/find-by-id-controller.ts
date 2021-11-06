import { PostModel, FindByIdController, FindPostByIdModel } from './protocols';

export class FindPostByIdController
  extends FindByIdController<FindPostByIdModel, PostModel> { }
