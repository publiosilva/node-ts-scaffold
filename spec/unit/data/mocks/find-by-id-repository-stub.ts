/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindByIdRepository } from '@/data/protocols/crud';
import { CRUDModelStub, FindByIdModelStub } from '@/spec/unit/domain/mocks';

export class FindByIdRepositoryStub
implements FindByIdRepository<FindByIdModelStub, CRUDModelStub> {
  async findById(data: FindByIdModelStub): Promise<CRUDModelStub> {
    const fakeEntity = {
      id: 'valid_id',
      name: 'valid_name',
    };

    return new Promise((resolve) => resolve(fakeEntity));
  }
}
