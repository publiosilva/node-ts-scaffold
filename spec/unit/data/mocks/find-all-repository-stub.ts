import { FindAllRepository } from '@/data/protocols/crud';
import { CRUDModelStub } from '@/spec/unit/domain/mocks';

export class FindAllRepositoryStub implements FindAllRepository<CRUDModelStub> {
  async findAll(): Promise<CRUDModelStub[]> {
    const fakeEntity = {
      id: 'valid_id',
      name: 'valid_name',
    };

    return new Promise((resolve) => resolve([fakeEntity]));
  }
}
