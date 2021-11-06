import { Validation } from '@/presentation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  async validate(input: any): Promise<Error> {
    const errors = await Promise.all(
      this.validations.map((validation) => validation.validate(input)),
    );

    return errors.find((value) => value);
  }
}
