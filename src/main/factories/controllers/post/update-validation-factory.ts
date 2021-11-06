import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

export function makeUpdatePostValidation(): ValidationComposite {
  return new ValidationComposite([
    ...['id', 'subject', 'body'].map((field) => new RequiredFieldValidation(field)),
  ]);
}
