/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindById } from '@/domain/usecases/crud';
import { CRUDModelStub, FindByIdModelStub } from '@/spec/unit/domain/mocks';

export class FindByIdStub implements FindById<FindByIdModelStub, CRUDModelStub> {
  async call(data: FindByIdModelStub): Promise<CRUDModelStub> {
    const fakeEntity = {
      id: 'any_id',
      name: 'any_name',
    };

    return new Promise((resolve) => resolve(fakeEntity));
  }
}
