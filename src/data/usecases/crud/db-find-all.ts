import { CRUDModel } from '@/domain/models';
import { FindAll } from '@/domain/usecases/crud';
import { FindAllRepository } from '@/data/protocols/crud';

export class DBFindAll<A extends CRUDModel> implements FindAll<A> {
  private readonly findAllRepository: FindAllRepository<A>;

  constructor(findAllRepository: FindAllRepository<A>) {
    this.findAllRepository = findAllRepository;
  }

  async call(): Promise<A[]> {
    return this.findAllRepository.findAll();
  }
}
