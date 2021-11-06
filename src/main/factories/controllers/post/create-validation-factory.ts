import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

export function makeCreatePostValidation(): ValidationComposite {
  return new ValidationComposite([
    ...['subject', 'body'].map((field) => new RequiredFieldValidation(field)),
  ]);
}
