import { CRUDModel } from '@/domain/models';

export interface CreateModel { }

export interface Create<A extends CreateModel, B extends CRUDModel> {
  call(data: A): Promise<B>;
}
