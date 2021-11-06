import { DeleteModel } from '@/domain/usecases/crud';

export interface DeleteRepository<A extends DeleteModel> {
  delete(data: A): Promise<void>;
}
