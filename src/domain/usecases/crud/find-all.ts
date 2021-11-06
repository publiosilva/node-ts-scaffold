import { CRUDModel } from '@/domain/models';

export interface FindAll<A extends CRUDModel> {
  call(): Promise<Array<A>>;
}
