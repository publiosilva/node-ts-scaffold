import { CRUDModel } from '@/domain/models';

export interface UpdateModel {
  id: string
}

export interface Update<A extends UpdateModel, B extends CRUDModel> {
  call(data: A): Promise<B>;
}
