import { Validation } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';

export class LowerLimitValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly limit: number) {}

  async validate(input: any): Promise<Error> {
    if (input[this.fieldName] < this.limit) {
      return new InvalidParamError(this.fieldName);
    }

    return null;
  }
}
