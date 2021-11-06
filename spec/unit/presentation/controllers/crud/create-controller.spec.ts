import { Create } from '@/domain/usecases/crud';
import { CreateController } from '@/presentation/controllers/crud';
import { Validation } from '@/presentation/protocols';
import { CreateModelStub, CreateStub, CRUDModelStub } from '@/spec/unit/domain/mocks';
import { ValidationSpy } from '@/spec/unit/validation/mocks';

const makeCreate = (): Create<CreateModelStub, CRUDModelStub> => new CreateStub();

const makeValidation = (): Validation => new ValidationSpy();

type SutTypes = {
  sut: CreateController<CreateModelStub, CRUDModelStub>
  validationStub: Validation
  createStub: Create<CreateModelStub, CRUDModelStub>
};

const makeSut = (): SutTypes => {
  const createStub = makeCreate();
  const validationStub = makeValidation();
  const sut = new CreateController(createStub, validationStub);

  return { sut, validationStub, createStub };
};

describe('Create Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateStub = jest.spyOn(validationStub, 'validate');
    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };

    await sut.handle(httpRequest);

    expect(validateStub).toHaveBeenCalledWith({
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
    };

    const promise = sut.handle(httpRequest);

    await expect(promise).rejects.toThrow();
  });

  test('Should return 422 if Validation returns error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(async () => new Promise((resolve) => resolve({ name: 'any_name', message: 'any_message' })));
    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual({ name: 'any_name', message: 'any_message' });
  });

  test('Should call Create with correct values', async () => {
    const { sut, createStub } = makeSut();
    const callStub = jest.spyOn(createStub, 'call');
    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };

    await sut.handle(httpRequest);

    expect(callStub).toHaveBeenCalledWith({
      name: 'any_name',
    });
  });

  test('Should return throw if Create throws', async () => {
    const { sut, createStub } = makeSut();
    jest.spyOn(createStub, 'call').mockImplementationOnce(async () => new Promise((_, reject) => reject(new Error())));
    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };

    const promise = sut.handle(httpRequest);

    await expect(promise).rejects.toThrow();
  });

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
    });
  });
});
