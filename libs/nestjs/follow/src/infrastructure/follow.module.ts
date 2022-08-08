import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { commandHandlers } from '../application';
import { Follow, eventTransformers } from '../domain';
import { FollowController } from './controller';
import { followModels } from './follow.models';
import { followProviders } from './follow.providers';
import {
  FollowSchema,
  FOLLOWS_PROJECTION,
  projectionHandlers,
} from './read-model';
import { FollowService } from './services';

@Module({
  controllers: [FollowController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Follow], eventTransformers),
    MongooseModule.forFeature(followModels),
  ],
  providers: [
    ...commandHandlers,
    ...projectionHandlers,
    ...followProviders,
    FollowService,
  ],
  exports: [],
})
export class FollowModule {}
