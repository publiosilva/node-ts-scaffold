import { PostModel, DBFindById, FindPostByIdModel } from './protocols';

export class DBFindPostById
  extends DBFindById<FindPostByIdModel, PostModel> { }
