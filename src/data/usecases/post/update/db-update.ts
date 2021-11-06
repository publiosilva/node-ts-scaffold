import {
  PostModel, DBUpdate, UpdatePostModel,
} from './protocols';

export class DBUpdatePost extends DBUpdate<UpdatePostModel, PostModel> { }
