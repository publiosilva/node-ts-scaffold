import { CreateModel } from '@/domain/usecases/crud';

export interface CreateModelStub extends CreateModel {
  name: string
}
