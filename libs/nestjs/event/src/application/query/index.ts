import { GetEventHandler } from './get-event.handler';
import { GetEventsByEstablishmentHandler } from './get-events-by-establishment.handler';

export * from './get-event.query';
export * from './get-events-by-establishment.query';

export const queryHandlers = [GetEventHandler, GetEventsByEstablishmentHandler];
