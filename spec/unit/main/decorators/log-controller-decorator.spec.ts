import { LogControllerDecorator } from '@/main/decorators';
import { ControllerSpy } from '@/spec/unit/main/mocks';

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy,
};

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy();
  const sut = new LogControllerDecorator(controllerSpy);

  return {
    sut,
    controllerSpy,
  };
};

describe('LogControllerDecorator', () => {
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

  test('Should throw if controller throws', async () => {
    const { sut, controllerSpy } = makeSut();
    const fakeError = new Error('any_error');
    const fakeRequest = {
      body: 'any_thing',
    };
    jest.spyOn(controllerSpy, 'handle').mockImplementationOnce(() => {
      throw fakeError;
    });

    const promise = sut.handle(fakeRequest);

    await expect(promise).rejects.toThrow();
  });

  test('Should log error if controller throws', async () => {
    const { sut, controllerSpy } = makeSut();
    const fakeError = new Error('any_error');
    const fakeRequest = {
      body: 'any_thing',
    };
    const logSpy = jest.spyOn(console, 'log');
    jest.spyOn(controllerSpy, 'handle').mockImplementationOnce(() => {
      throw fakeError;
    });

    const promise = sut.handle(fakeRequest);

    await expect(promise).rejects.toThrow();
    expect(logSpy).toHaveBeenCalledWith(fakeError);
  });
});
