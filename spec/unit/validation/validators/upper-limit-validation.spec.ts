import { UpperLimitValidation } from '@/validation/validators';
import { InvalidParamError } from '@/presentation/errors';

const field = 'any_field';
const limit = 10;

const makeSut = (): UpperLimitValidation => new UpperLimitValidation(field, limit);

describe('UpperLimit Validation', () => {
  test('Should return a InvalidParamError if validation fails', async () => {
    const sut = makeSut();

    const error = await sut.validate({ [field]: 11 });

    expect(error).toEqual(new InvalidParamError(field));
  });

  test('Should not return if validation succeeds', async () => {
    const sut = makeSut();

    const error = await sut.validate({ [field]: 10 });

    expect(error).toBeFalsy();
  });
});
