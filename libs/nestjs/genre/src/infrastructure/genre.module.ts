import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { commandHandlers, queryHandlers } from '../application';
import { eventTransformers, Genre } from '../domain';
import { GenreController } from './controller';
import { genreProviders } from './genre.providers';
import {
  GENRES_PROJECTION,
  GenreSchema,
  genresProjections,
} from './read-model';
import { GenreService } from './services';

@Module({
  controllers: [GenreController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Genre], eventTransformers),
    MongooseModule.forFeature([
      {
        name: GENRES_PROJECTION,
        schema: GenreSchema,
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...genreProviders,
    ...genresProjections,
    GenreService,
  ],
})
export class GenreModule {}
