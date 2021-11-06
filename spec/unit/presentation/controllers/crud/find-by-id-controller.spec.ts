import { FindById } from '@/domain/usecases/crud';
import { FindByIdController } from '@/presentation/controllers/crud';
import { CRUDModelStub, FindByIdModelStub, FindByIdStub } from '@/spec/unit/domain/mocks';

const makeFindById = (): FindById<FindByIdModelStub, CRUDModelStub> => new FindByIdStub();

type SutTypes = {
  sut: FindByIdController<FindByIdModelStub, CRUDModelStub>
  findByIdStub: FindById<FindByIdModelStub, CRUDModelStub>
};

const makeSut = (): SutTypes => {
  const findByIdStub = makeFindById();
  const sut = new FindByIdController(findByIdStub);

  return { sut, findByIdStub };
};

describe('FindById Controller', () => {
  test('Should call FindById', async () => {
    const { sut, findByIdStub } = makeSut();
    const callStub = jest.spyOn(findByIdStub, 'call');
    const httpRequest = {
      body: null,
      params: new Map([['id', 'any_id']]),
    };

    await sut.handle(httpRequest);

    expect(callStub).toHaveBeenCalledTimes(1);
  });

  test('Should throw if FindById throws', async () => {
    const { sut, findByIdStub } = makeSut();
    jest.spyOn(findByIdStub, 'call').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: null,
      params: new Map([['id', 'any_id']]),
    };

    const promise = sut.handle(httpRequest);

    await expect(promise).rejects.toThrow();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: null,
      params: new Map([['id', 'any_id']]),
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'any_id',
      name: 'any_name',
    });
  });

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
});
