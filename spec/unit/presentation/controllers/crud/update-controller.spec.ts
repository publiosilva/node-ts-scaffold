import {
  FindById, Update,
} from '@/domain/usecases/crud';
import { UpdateController } from '@/presentation/controllers/crud';
import { Validation } from '@/presentation/protocols';
import {
  CRUDModelStub, FindByIdModelStub, FindByIdStub, UpdateModelStub, UpdateStub,
} from '@/spec/unit/domain/mocks';
import { ValidationSpy } from '@/spec/unit/validation/mocks';

const makeUpdate = (): Update<UpdateModelStub, CRUDModelStub> => new UpdateStub();

const makeFindById = (): FindById<FindByIdModelStub, CRUDModelStub> => new FindByIdStub();

const makeValidation = (): Validation => new ValidationSpy();

type SutTypes = {
  sut: UpdateController<UpdateModelStub, FindByIdModelStub, CRUDModelStub>
  validationStub: Validation
  updateStub: Update<UpdateModelStub, CRUDModelStub>
  findByIdStub: FindById<FindByIdModelStub, CRUDModelStub>
};

const makeSut = (): SutTypes => {
  const updateStub = makeUpdate();
  const findByIdStub = makeFindById();
  const validationStub = makeValidation();
  const sut = new UpdateController(
    updateStub,
    findByIdStub,
    validationStub,
  );

  return {
    sut, validationStub, updateStub, findByIdStub,
  };
};

describe('Update Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateStub = jest.spyOn(validationStub, 'validate');
    const httpRequest = {
      body: {
        name: 'any_name',
      },
      params: new Map([['id', 'any_id']]),
    };

    await sut.handle(httpRequest);

    expect(validateStub).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_name',
    });
  });

  test('Should return throw if Validation throws', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(async () => new Promise((_, reject) => reject(new Error())));
    const httpRequest = {
      body: {
        name: 'any_name',
      },
      params: new Map([['id', 'any_id']]),
    };

    const promise = sut.handle(httpRequest);

    await expect(promise).rejects.toThrow();
  });

  test('Should return 404 if  not found', async () => {
    const { sut, findByIdStub } = makeSut();
    jest.spyOn(findByIdStub, 'call').mockImplementationOnce(() => null);
    const httpRequest = {
      body: {
        name: 'any_name',
      },
      params: new Map([['id', 'any_id']]),
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toEqual({
      name: 'NotFoundError',
      message: 'Entity not found',
    });
  });

  test('Should return 422 if Validation returns error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(async () => new Promise((resolve) => resolve({ name: 'any_name', message: 'any_message' })));
    const httpRequest = {
      body: {
        name: 'any_name',
      },
      params: new Map([['id', 'any_id']]),
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual({ name: 'any_name', message: 'any_message' });
  });

  test('Should call Update with correct values', async () => {
    const { sut, updateStub } = makeSut();
    const callStub = jest.spyOn(updateStub, 'call');
    const httpRequest = {
      body: {
        name: 'any_name',
      },
      params: new Map([['id', 'any_id']]),
    };

    await sut.handle(httpRequest);

    expect(callStub).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_name',
    });
  });

  test('Should return throw if Update throws', async () => {
    const { sut, updateStub } = makeSut();
    jest.spyOn(updateStub, 'call').mockImplementationOnce(async () => new Promise((_, reject) => reject(new Error())));
    const httpRequest = {
      body: {
        name: 'any_name',
      },
      params: new Map([['id', 'any_id']]),
    };

    const promise = sut.handle(httpRequest);

    await expect(promise).rejects.toThrow();
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
      },
      params: new Map([['id', 'any_id']]),
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'any_id',
      name: 'any_name',
    });
  });
});
