/* eslint-disable @typescript-eslint/no-unused-vars */

import { FindByIdRepository } from '@/data/protocols/crud';
import { DBFindById } from '@/data/usecases/crud';
import { FindByIdRepositoryStub } from '@/spec/unit/data/mocks';
import { CRUDModelStub, FindByIdModelStub } from '@/spec/unit/domain/mocks';

const makeFindByIdRepository = (): FindByIdRepository<
FindByIdModelStub,
CRUDModelStub
> => new FindByIdRepositoryStub();

interface SutTypes {
  sut: DBFindById<FindByIdModelStub, CRUDModelStub>,
  findByIdRepositoryStub: FindByIdRepository<FindByIdModelStub, CRUDModelStub>,
}

const makeSut = (): SutTypes => {
  const findByIdRepositoryStub = makeFindByIdRepository();
  const sut = new DBFindById(findByIdRepositoryStub);

  return { sut, findByIdRepositoryStub };
};

describe('DBFindById Usecase', () => {
  test('Should call FindByIdRepository', async () => {
    const { sut, findByIdRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(findByIdRepositoryStub, 'findById');

    await sut.call({ id: 'any_id' });

    expect(listSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throw if FindByIdRepository throws', async () => {
    const { sut, findByIdRepositoryStub } = makeSut();
    jest.spyOn(findByIdRepositoryStub, 'findById').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.call({ id: 'any_id' });

    await expect(promise).rejects.toThrow();
  });

  test('Should return a ', async () => {
    const { sut } = makeSut();

    const entity = await sut.call({ id: 'any_id' });

    expect(entity).toBeTruthy();
    expect(entity).toEqual({
      id: 'valid_id',
      name: 'valid_name',
    });
  });
});
