import { DeletePostModel } from '@/domain/usecases/post';
import { DeleteRepository } from '@/data/protocols/crud';

export interface DeletePostRepository extends DeleteRepository<DeletePostModel> { }
