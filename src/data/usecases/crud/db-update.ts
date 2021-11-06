import { CRUDModel } from '@/domain/models';
import { Update, UpdateModel } from '@/domain/usecases/crud';
import { UpdateRepository } from '@/data/protocols/crud';

export class DBUpdate<A extends UpdateModel, B extends CRUDModel> implements Update<A, B> {
  private readonly updateRepository: UpdateRepository<A, B>;

  constructor(updateRepository: UpdateRepository<A, B>) {
    this.updateRepository = updateRepository;
  }

  async call(data: A): Promise<B> {
    return this.updateRepository.update(data);
  }
}
