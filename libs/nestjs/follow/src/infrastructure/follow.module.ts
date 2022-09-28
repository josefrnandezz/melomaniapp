import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { MailModule } from '@melomaniapp/nestjs/mailer';
import { UserModule } from '@melomaniapp/nestjs/user';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { commandHandlers, queryHandlers } from '../application';
import { Follow, eventTransformers } from '../domain';
import { FollowController } from './controller';
import { followModels } from './follow.models';
import { followProviders } from './follow.providers';
import { projectionHandlers } from './read-model';
import { FollowService } from './services';

@Module({
  controllers: [FollowController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Follow], eventTransformers),
    MongooseModule.forFeature(followModels),
    MailModule,
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...projectionHandlers,
    ...followProviders,
    FollowService,
  ],
  exports: [],
})
export class FollowModule {}
