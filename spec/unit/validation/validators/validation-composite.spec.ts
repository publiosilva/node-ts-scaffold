import { MissingParamError } from '@/presentation/errors';
import { ValidationSpy } from '@/spec/unit/validation/mocks';
import { ValidationComposite } from '@/validation/validators';

const makeValidationSpy = (): ValidationSpy => new ValidationSpy();

const field = 'any_field';

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
};

const makeSut = (): SutTypes => {
  const validationSpies = [
    makeValidationSpy(),
    makeValidationSpy(),
  ];
  const sut = new ValidationComposite(validationSpies);

  return {
    sut,
    validationSpies,
  };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[1].error = new MissingParamError(field);

    const error = await sut.validate({ [field]: 'any_value' });

    expect(error).toEqual(validationSpies[1].error);
  });

  test('Should return the first error if more then one validation fails', async () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[0].error = new Error();
    validationSpies[1].error = new MissingParamError(field);

    const error = await sut.validate({ [field]: 'any_value' });

    expect(error).toEqual(validationSpies[0].error);
  });

  test('Should not return if validation succeeds', async () => {
    const { sut } = makeSut();

    const error = await sut.validate({ [field]: 'any_value' });

    expect(error).toBeFalsy();
  });
});
