import { Controller } from '@/presentation/protocols';
import { LogControllerDecorator } from '@/main/decorators';

export const makeLogControllerDecorator = (
  controller: Controller,
): Controller => new LogControllerDecorator(controller);
