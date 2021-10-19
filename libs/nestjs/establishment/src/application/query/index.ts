import { GetEstablishmentHandler } from './get-establishment.handler';
import { GetEstablishmentsHandler } from './get-establishments.handler';

export * from './get-establishment.query';
export * from './get-establishments.query';

export const queryHandlers = [
  GetEstablishmentsHandler,
  GetEstablishmentHandler,
];
