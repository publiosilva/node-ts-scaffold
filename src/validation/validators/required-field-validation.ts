import { Validation } from '@/presentation/protocols';
import { MissingParamError } from '@/presentation/errors';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  async validate(input: any): Promise<Error> {
    if (!(this.fieldName in input) || input[this.fieldName] === null) {
      return new MissingParamError(this.fieldName);
    }

    return null;
  }
}
