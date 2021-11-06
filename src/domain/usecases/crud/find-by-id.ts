import { CRUDModel } from '@/domain/models';

export interface FindByIdModel {
  id: string
}

export interface FindById<A extends FindByIdModel, B extends CRUDModel> {
  call(data: A): Promise<B>;
}
