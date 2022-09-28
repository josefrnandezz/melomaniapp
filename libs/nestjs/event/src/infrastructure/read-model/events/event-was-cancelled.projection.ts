import { EventDTO } from '@melomaniapp/contracts/event';
import { MailService } from '@melomaniapp/nestjs/mailer';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EventWasCancelled } from '../../../domain';
import { EventDocument, EVENTS_PROJECTION } from './events.schema';

@EventsHandler(EventWasCancelled)
export class EventWasCancelledProjection
  implements IEventHandler<EventWasCancelled>
{
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>,
    private readonly mailService: MailService
  ) {}

  async handle(event: EventWasCancelled) {
    const eventDto = await this.events
      .findByIdAndDelete(event.aggregateId)
      .lean<EventDTO>();
    await this.mailService.sendEventWasCanceled(['jose@uco.es'], eventDto);
  }
}
