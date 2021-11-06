import { CRUDModel } from '@/domain/models';
import { UpdateModel } from '@/domain/usecases/crud';

export interface UpdateRepository<A extends UpdateModel, B extends CRUDModel> {
  update(data: A): Promise<B>;
}
