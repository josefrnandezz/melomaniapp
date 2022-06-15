import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { commandHandlers } from '../application';
import { Artist, eventTransformers } from '../domain';
import { ArtistController } from './controller';
import { artistProviders } from './artist.providers';
import {
  ARTISTS_PROJECTION,
  ArtistSchema,
  projectionHandlers,
} from './read-model';
import { ArtistService } from './services';

@Module({
  controllers: [ArtistController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Artist], eventTransformers),
    MongooseModule.forFeature([
      {
        name: ARTISTS_PROJECTION,
        schema: ArtistSchema,
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...artistProviders,
    ...projectionHandlers,
    ArtistService,
  ],
  exports: [],
})
export class ArtistModule {}
