import { FindAll } from '@/domain/usecases/crud';
import { CRUDModelStub } from '@/spec/unit/domain/mocks';

export class FindAllStub implements FindAll<CRUDModelStub> {
  call(): Promise<CRUDModelStub[]> {
    const fakeEntity = {
      id: 'valid_id',
      name: 'valid_name',
    };

    return new Promise((resolve) => resolve([fakeEntity]));
  }
}
