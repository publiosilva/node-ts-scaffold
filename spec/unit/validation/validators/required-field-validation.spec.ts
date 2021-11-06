import { RequiredFieldValidation } from '@/validation/validators';
import { MissingParamError } from '@/presentation/errors';

const field = 'any_field';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(field);

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', async () => {
    const sut = makeSut();

    const error = await sut.validate({ invalidField: 'any_value' });

    expect(error).toEqual(new MissingParamError(field));
  });

  test('Should not return if validation succeeds', async () => {
    const sut = makeSut();

    const error = await sut.validate({ [field]: 'any_value' });

    expect(error).toBeFalsy();
  });
});
