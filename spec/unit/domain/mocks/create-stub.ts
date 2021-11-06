/* eslint-disable @typescript-eslint/no-unused-vars */
import { Create } from '@/domain/usecases/crud';
import { CreateModelStub, CRUDModelStub } from '@/spec/unit/domain/mocks';

export class CreateStub implements Create<CreateModelStub, CRUDModelStub> {
  async call(data: CreateModelStub): Promise<CRUDModelStub> {
    const fakeEntity = {
      id: 'valid_id',
      name: 'valid_name',
    };

    return new Promise((resolve) => resolve(fakeEntity));
  }
}
