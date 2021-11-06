/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateRepository } from '@/data/protocols/crud';
import { DBUpdate } from '@/data/usecases/crud';
import { UpdateRepositoryStub } from '@/spec/unit/data/mocks';
import { CRUDModelStub, UpdateModelStub } from '@/spec/unit/domain/mocks';

const makeUpdateRepository = (): UpdateRepository<
UpdateModelStub,
CRUDModelStub
> => new UpdateRepositoryStub();

interface SutTypes {
  sut: DBUpdate<UpdateModelStub, CRUDModelStub>,
  updateRepositoryStub: UpdateRepository<UpdateModelStub, CRUDModelStub>,
}

const makeSut = (): SutTypes => {
  const updateRepositoryStub = makeUpdateRepository();
  const sut = new DBUpdate(updateRepositoryStub);

  return { sut, updateRepositoryStub };
};

describe('DBUpdate Usecase', () => {
  test('Should call UpdateRepository with correct values', async () => {
    const { sut, updateRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updateRepositoryStub, 'update');
    const data = {
      id: 'valid_id',
      name: 'valid_name',
    };

    await sut.call(data);

    expect(updateSpy).toHaveBeenCalledWith(data);
  });

  test('Should throw if UpdateRepository throws', async () => {
    const { sut, updateRepositoryStub } = makeSut();
    jest.spyOn(updateRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const data = {
      id: 'valid_id',
      name: 'valid_name',
    };

    const promise = sut.call(data);

    await expect(promise).rejects.toThrow();
  });

  test('Should return a  on success', async () => {
    const { sut } = makeSut();
    const data = {
      id: 'valid_id',
      name: 'valid_name',
    };

    const entity = await sut.call(data);

    expect(entity).toEqual({
      id: 'valid_id',
      name: 'valid_name',
    });
  });
});
