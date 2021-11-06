import { FindAllRepository } from '@/data/protocols/crud';
import { DBFindAll } from '@/data/usecases/crud';
import { FindAllRepositoryStub } from '@/spec/unit/data/mocks';
import { CRUDModelStub } from '@/spec/unit/domain/mocks';

const makeFindAllRepository = (): FindAllRepository<CRUDModelStub> => new FindAllRepositoryStub();

interface SutTypes {
  sut: DBFindAll<CRUDModelStub>,
  findAllRepositoryStub: FindAllRepository<CRUDModelStub>,
}

const makeSut = (): SutTypes => {
  const findAllRepositoryStub = makeFindAllRepository();
  const sut = new DBFindAll(findAllRepositoryStub);

  return { sut, findAllRepositoryStub };
};

describe('DBFindAll Usecase', () => {
  test('Should call FindAllRepository', async () => {
    const { sut, findAllRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(findAllRepositoryStub, 'findAll');

    await sut.call();

    expect(listSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throw if FindAllRepository throws', async () => {
    const { sut, findAllRepositoryStub } = makeSut();
    jest.spyOn(findAllRepositoryStub, 'findAll').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.call();

    await expect(promise).rejects.toThrow();
  });

  test('Should return a list of entities', async () => {
    const { sut } = makeSut();

    const entities = await sut.call();

    expect(entities).toBeTruthy();
    expect(Array.isArray(entities)).toBeTruthy();
    expect(entities.length).toBe(1);
    expect(entities[0]).toEqual({
      id: 'valid_id',
      name: 'valid_name',
    });
  });
});
