import { CRUDModel } from '@/domain/models';
import { FindById, FindByIdModel } from '@/domain/usecases/crud';
import { FindByIdRepository } from '@/data/protocols/crud';

export class DBFindById<A extends FindByIdModel, B extends CRUDModel>
implements FindById<A, B> {
  private readonly findByIdRepository: FindByIdRepository<A, B>;

  constructor(findByIdRepository: FindByIdRepository<A, B>) {
    this.findByIdRepository = findByIdRepository;
  }

  async call(data: A): Promise<B> {
    return this.findByIdRepository.findById(data);
  }
}
