import { GetEventHandler } from './get-event.handler';
import { GetEventsByEstablishmentHandler } from './get-events-by-establishment.handler';
import { GetEventsByCityHandler } from './get-events-by-city.handler';

export * from './get-event.query';
export * from './get-events-by-establishment.query';
export * from './get-events-by-city.query';

export const queryHandlers = [
  GetEventHandler,
  GetEventsByEstablishmentHandler,
  GetEventsByCityHandler,
];
