/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteRepository } from '@/data/protocols/crud';
import { DeleteModelStub } from '@/spec/unit/domain/mocks';

export class DeleteRepositoryStub implements DeleteRepository<DeleteModelStub> {
  async delete(data: DeleteModelStub): Promise<void> { }
}
