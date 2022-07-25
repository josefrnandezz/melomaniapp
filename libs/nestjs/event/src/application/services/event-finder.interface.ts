import { EventDTO } from '@melomaniapp/contracts/event';

import { EventId } from '../../domain';

export const EVENT_FINDER = 'EVENT_FINDER';

export interface IEventFinder {
  find(id: EventId): Promise<EventDTO>;
}
