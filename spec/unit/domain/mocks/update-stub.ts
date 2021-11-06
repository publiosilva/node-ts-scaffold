/* eslint-disable @typescript-eslint/no-unused-vars */
import { Update } from '@/domain/usecases/crud';
import { CRUDModelStub, UpdateModelStub } from '@/spec/unit/domain/mocks';

export class UpdateStub implements Update<UpdateModelStub, CRUDModelStub> {
  async call(data: UpdateModelStub): Promise<CRUDModelStub> {
    const fakeEntity = {
      id: 'any_id',
      name: 'any_name',
    };

    return new Promise((resolve) => resolve(fakeEntity));
  }
}
