/* eslint-disable @typescript-eslint/no-unused-vars */
import { Delete } from '@/domain/usecases/crud';
import { DeleteModelStub } from '@/spec/unit/domain/mocks';

export class DeleteStub implements Delete<DeleteModelStub> {
  async call(data: DeleteModelStub): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}
