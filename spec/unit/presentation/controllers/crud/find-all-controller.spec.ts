import { FindAll } from '@/domain/usecases/crud';
import { FindAllController } from '@/presentation/controllers/crud';
import { CRUDModelStub, FindAllStub } from '@/spec/unit/domain/mocks';

const makeFindAll = (): FindAll<CRUDModelStub> => new FindAllStub();

type SutTypes = {
  sut: FindAllController<CRUDModelStub>
  findAllStub: FindAll<CRUDModelStub>
};

const makeSut = (): SutTypes => {
  const findAllStub = makeFindAll();
  const sut = new FindAllController(findAllStub);

  return { sut, findAllStub };
};

describe('FindAll Controller', () => {
  test('Should call FindAll', async () => {
    const { sut, findAllStub } = makeSut();
    const callStub = jest.spyOn(findAllStub, 'call');
    const httpRequest = {
      body: null,
    };

    await sut.handle(httpRequest);

    expect(callStub).toHaveBeenCalledTimes(1);
  });

  test('Should throw if FindAll throws', async () => {
    const { sut, findAllStub } = makeSut();
    jest.spyOn(findAllStub, 'call').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: null,
    };

    const promise = sut.handle(httpRequest);

    await expect(promise).rejects.toThrow();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: null,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([{
      id: 'valid_id',
      name: 'valid_name',
    }]);
  });
});
