import { Controller } from '@/presentation/protocols';
import { ErrorHandlingControllerDecorator } from '@/main/decorators';

export const makeErrorHandlingControllerDecorator = (
  controller: Controller,
): Controller => new ErrorHandlingControllerDecorator(controller);
