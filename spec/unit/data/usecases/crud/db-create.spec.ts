/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateRepository } from '@/data/protocols/crud';
import { DBCreate } from '@/data/usecases/crud';
import { CreateRepositoryStub } from '@/spec/unit/data/mocks';
import { CreateModelStub, CRUDModelStub } from '@/spec/unit/domain/mocks';

const makeCreateRepository = (): CreateRepository<
CreateModelStub,
CRUDModelStub
> => new CreateRepositoryStub();

interface SutTypes {
  sut: DBCreate<CreateModelStub, CRUDModelStub>,
  createRepositoryStub: CreateRepository<CreateModelStub, CRUDModelStub>,
}

const makeSut = (): SutTypes => {
  const createRepositoryStub = makeCreateRepository();
  const sut = new DBCreate(createRepositoryStub);

  return { sut, createRepositoryStub };
};

describe('DBCreate Usecase', () => {
  test('Should call CreateRepository with correct values', async () => {
    const { sut, createRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createRepositoryStub, 'create');
    const Data = {
      name: 'valid_name',
    };

    await sut.call(Data);

    expect(createSpy).toHaveBeenCalledWith(Data);
  });

  test('Should throw if CreateRepository throws', async () => {
    const { sut, createRepositoryStub } = makeSut();
    jest.spyOn(createRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const Data = {
      name: 'valid_name',
    };

    const promise = sut.call(Data);

    await expect(promise).rejects.toThrow();
  });

  test('Should return a  on success', async () => {
    const { sut } = makeSut();
    const data = {
      name: 'valid_name',
    };

    const entity = await sut.call(data);

    expect(entity).toEqual({
      id: 'valid_id',
      name: 'valid_name',
    });
  });
});
