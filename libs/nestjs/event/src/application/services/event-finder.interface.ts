import { EventDTO, FullEventDTO } from '@melomaniapp/contracts/event';

import { EstablishmentId, EventId } from '../../domain';

export const EVENT_FINDER = 'EVENT_FINDER';

export interface IEventFinder {
  find(id: EventId): Promise<FullEventDTO>;
  findByEstablishment(establishmentId: EstablishmentId): Promise<EventDTO[]>;
  findByCity(city: string): Promise<EventDTO[]>;
}
