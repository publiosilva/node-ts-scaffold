import { Delete, DeleteModel } from '@/domain/usecases/crud';

export interface DeletePostModel extends DeleteModel { }

export interface DeletePost extends Delete<DeletePostModel> { }
