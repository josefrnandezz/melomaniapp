import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Event } from '../domain';
import { EventController } from './controller';
import {
  EventSchema,
  EVENTS_PROJECTION,
  projectionHandlers,
} from './read-model';
import { eventTransformers } from '../domain';
import { commandHandlers } from '../application';
import { EventService } from './services';
import { eventProviders } from './event.providers';
import { queryHandlers } from '../application/query';

@Module({
  controllers: [EventController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Event], eventTransformers),
    MongooseModule.forFeature([
      {
        name: EVENTS_PROJECTION,
        schema: EventSchema,
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...projectionHandlers,
    ...eventProviders,
    EventService,
  ],
  exports: [],
})
export class EventModule {}
