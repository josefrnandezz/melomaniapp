import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { commandHandlers, queryHandlers } from '../application';
import { Establishment, eventTransformers } from '../domain';
import { EstablishmentController } from './controller';
import { establishmentProviders } from './establishment.providers';
import {
  ESTABLISHMENTS_PROJECTION,
  EstablishmentSchema,
  projectionHandlers,
} from './read-model';
import { sagas } from './saga';
import { EstablishmentService } from './services';

@Module({
  controllers: [EstablishmentController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Establishment], eventTransformers),
    MongooseModule.forFeature([
      {
        name: ESTABLISHMENTS_PROJECTION,
        schema: EstablishmentSchema,
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...establishmentProviders,
    ...projectionHandlers,
    ...sagas,
    EstablishmentService,
  ],
  exports: [],
})
export class EstablishmentModule {}
