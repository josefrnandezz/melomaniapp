import { Model } from 'mongoose';
import { IEventFinder } from '../../application';
import { EventId } from '../../domain';
import { InjectModel } from '@nestjs/mongoose';
import { EVENTS_PROJECTION, EventDocument } from '../read-model';
import { EventDTO } from '@melomaniapp/contracts/event';

export class EventFinder implements IEventFinder {
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>
  ) {}

  async find(id: EventId): Promise<EventDTO> {
    const event = await this.events.findById(id.value);

    if (!event) {
      return null;
    }

    return new EventDTO({ ...event });
  }
}
