/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateRepository } from '@/data/protocols/crud';
import { CRUDModelStub, UpdateModelStub } from '@/spec/unit/domain/mocks';

export class UpdateRepositoryStub implements UpdateRepository<UpdateModelStub, CRUDModelStub> {
  async update(data: UpdateModelStub): Promise<CRUDModelStub> {
    const fakeEntity = {
      id: 'valid_id',
      name: 'valid_name',
    };

    return new Promise((resolve) => resolve(fakeEntity));
  }
}
