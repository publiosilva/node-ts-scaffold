import {
  Delete, FindById,
} from '@/domain/usecases/crud';
import { DeleteController } from '@/presentation/controllers/crud';
import {
  CRUDModelStub, DeleteModelStub, DeleteStub, FindByIdModelStub, FindByIdStub,
} from '@/spec/unit/domain/mocks';

const makeDelete = (): Delete<DeleteModelStub> => new DeleteStub();

const makeFindById = (): FindById<FindByIdModelStub, CRUDModelStub> => new FindByIdStub();

type SutTypes = {
  sut: DeleteController<DeleteModelStub, FindByIdModelStub, CRUDModelStub>
  deleteStub: Delete<DeleteModelStub>
  findByIdStub: FindById<FindByIdModelStub, CRUDModelStub>
};

const makeSut = (): SutTypes => {
  const deleteStub = makeDelete();
  const findByIdStub = makeFindById();
  const sut = new DeleteController(
    deleteStub,
    findByIdStub,
  );

  return {
    sut, deleteStub, findByIdStub,
  };
};

describe('Delete Controller', () => {
  test('Should return 404 if  not found', async () => {
    const { sut, findByIdStub } = makeSut();
    jest.spyOn(findByIdStub, 'call').mockImplementationOnce(() => null);
    const httpRequest = {
      body: null,
      params: new Map([['id', 'any_id']]),
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toEqual({
      name: 'NotFoundError',
      message: 'Entity not found',
    });
  });

  test('Should call Delete with correct values', async () => {
    const { sut, deleteStub } = makeSut();
    const callStub = jest.spyOn(deleteStub, 'call');
    const httpRequest = {
      body: null,
      params: new Map([['id', 'any_id']]),
    };

    await sut.handle(httpRequest);

    expect(callStub).toHaveBeenCalledWith({
      id: 'any_id',
    });
  });

  test('Should return throw if Delete throws', async () => {
    const { sut, deleteStub } = makeSut();
    jest.spyOn(deleteStub, 'call').mockImplementationOnce(async () => new Promise((_, reject) => reject(new Error())));
    const httpRequest = {
      body: null,
      params: new Map([['id', 'any_id']]),
    };

    const promise = sut.handle(httpRequest);

    await expect(promise).rejects.toThrow();
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: null,
      params: new Map([['id', 'any_id']]),
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toEqual(null);
  });
});
