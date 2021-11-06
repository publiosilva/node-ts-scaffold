import { CRUDModel } from '@/domain/models';
import { FindByIdModel } from '@/domain/usecases/crud';

export interface FindByIdRepository<A extends FindByIdModel, B extends CRUDModel> {
  findById(data: A): Promise<B>;
}
