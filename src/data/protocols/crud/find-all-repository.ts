import { CRUDModel } from '@/domain/models';

export interface FindAllRepository<A extends CRUDModel> {
  findAll(): Promise<Array<A>>;
}
