import { CRUDModel } from '@/domain/models';
import { CreateModel } from '@/domain/usecases/crud';

export interface CreateRepository<A extends CreateModel, B extends CRUDModel> {
  create(data: A): Promise<B>;
}
