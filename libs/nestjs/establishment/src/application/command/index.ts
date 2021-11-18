import { CreateEstablishmentHandler } from './create-establishment.handler';
import { UpdateEstablishmentHandler } from './update-establishment.handler';

export * from './create-establishment.command';
export * from './update-establishment.command';

export const commandHandlers = [
  CreateEstablishmentHandler,
  UpdateEstablishmentHandler,
];
