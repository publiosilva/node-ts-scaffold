import { Validation } from '@/presentation/protocols';

export class ValidationSpy implements Validation {
  error: Error = null;

  input: any;

  async validate(input: any): Promise<Error> {
    this.input = input;

    return this.error;
  }
}
