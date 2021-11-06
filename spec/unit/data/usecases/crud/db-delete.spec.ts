/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteRepository } from '@/data/protocols/crud';
import { DBDelete } from '@/data/usecases/crud';
import { DeleteRepositoryStub } from '@/spec/unit/data/mocks';
import { DeleteModelStub } from '@/spec/unit/domain/mocks';

const makeDeleteRepository = (): DeleteRepository<DeleteModelStub> => new DeleteRepositoryStub();

interface SutTypes {
  sut: DBDelete<DeleteModelStub>,
  deleteRepositoryStub: DeleteRepository<DeleteModelStub>,
}

const makeSut = (): SutTypes => {
  const deleteRepositoryStub = makeDeleteRepository();
  const sut = new DBDelete(deleteRepositoryStub);

  return { sut, deleteRepositoryStub };
};

describe('DBDelete Usecase', () => {
  test('Should call DeleteRepository', async () => {
    const { sut, deleteRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteRepositoryStub, 'delete');

    await sut.call({ id: 'any_id' });

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throw if DeleteRepository throws', async () => {
    const { sut, deleteRepositoryStub } = makeSut();
    jest.spyOn(deleteRepositoryStub, 'delete').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.call({ id: 'any_id' });

    await expect(promise).rejects.toThrow();
  });
});
