import { Delete, DeleteModel } from '@/domain/usecases/crud';
import { DeleteRepository } from '@/data/protocols/crud';

export class DBDelete<A extends DeleteModel> implements Delete<A> {
  private readonly deleteRepository: DeleteRepository<A>;

  constructor(deleteRepository: DeleteRepository<A>) {
    this.deleteRepository = deleteRepository;
  }

  async call(data: A): Promise<void> {
    return this.deleteRepository.delete(data);
  }
}
