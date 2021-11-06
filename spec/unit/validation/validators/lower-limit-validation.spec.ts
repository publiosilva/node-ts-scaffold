import { LowerLimitValidation } from '@/validation/validators';
import { InvalidParamError } from '@/presentation/errors';

const field = 'any_field';
const limit = 0;

const makeSut = (): LowerLimitValidation => new LowerLimitValidation(field, limit);

describe('LowerLimit Validation', () => {
  test('Should return a InvalidParamError if validation fails', async () => {
    const sut = makeSut();

    const error = await sut.validate({ [field]: -1 });

    expect(error).toEqual(new InvalidParamError(field));
  });

  test('Should not return if validation succeeds', async () => {
    const sut = makeSut();

    const error = await sut.validate({ [field]: 0 });

    expect(error).toBeFalsy();
  });
});
