/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateRepository } from '@/data/protocols/crud';
import { CreateModelStub, CRUDModelStub } from '@/spec/unit/domain/mocks';

export class CreateRepositoryStub implements CreateRepository<CreateModelStub, CRUDModelStub> {
  async create(data: CreateModelStub): Promise<CRUDModelStub> {
    const fakeEntity = {
      id: 'valid_id',
      name: 'valid_name',
    };

    return new Promise((resolve) => resolve(fakeEntity));
  }
}
