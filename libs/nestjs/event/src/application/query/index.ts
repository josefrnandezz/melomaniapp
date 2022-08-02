import { GetEventHandler } from './get-event.handler';
import { GetEventsByEstablishmentQuery } from './get-events-by-establishment.query';

export * from './get-event.query';
export * from './get-events-by-establishment.query';

export const queryHandlers = [GetEventHandler, GetEventsByEstablishmentQuery];
