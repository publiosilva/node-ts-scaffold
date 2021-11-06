import { ErrorHandlingControllerDecorator } from '@/main/decorators';
import { ControllerSpy } from '@/spec/unit/main/mocks';

type SutTypes = {
  sut: ErrorHandlingControllerDecorator
  controllerSpy: ControllerSpy,
};

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy();
  const sut = new ErrorHandlingControllerDecorator(controllerSpy);

  return {
    sut,
    controllerSpy,
  };
};

describe('ErrorHandlingControllerDecorator', () => {
  test('Should call console.log if controller throws', async () => {
    const { sut, controllerSpy } = makeSut();
    const fakeRequest = {
      body: 'any_thing',
    };

    await sut.handle(fakeRequest);

    expect(controllerSpy.request).toEqual(fakeRequest);
  });

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut();
    const fakeRequest = {
      body: 'any_thing',
    };

    const httpResponse = await sut.handle(fakeRequest);

    expect(httpResponse).toEqual(controllerSpy.response);
  });

  test('Should return internal server error if controller throws', async () => {
    const { sut, controllerSpy } = makeSut();
    const fakeRequest = {
      body: 'any_thing',
    };
    jest.spyOn(controllerSpy, 'handle').mockImplementationOnce(() => {
      throw new Error('any_error');
    });

    const httpResponse = await sut.handle(fakeRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual({ name: 'InternalServerError', message: 'Internal server error' });
  });
});
