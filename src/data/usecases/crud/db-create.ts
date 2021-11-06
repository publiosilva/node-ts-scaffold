import { CRUDModel } from '@/domain/models';
import { Create, CreateModel } from '@/domain/usecases/crud';
import { CreateRepository } from '@/data/protocols/crud';

export class DBCreate<A extends CreateModel, B extends CRUDModel> implements Create<A, B> {
  private readonly createRepository: CreateRepository<A, B>;

  constructor(createRepository: CreateRepository<A, B>) {
    this.createRepository = createRepository;
  }

  async call(data: A): Promise<B> {
    return this.createRepository.create(data);
  }
}
