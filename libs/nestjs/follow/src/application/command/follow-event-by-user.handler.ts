import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowEventByUserCommand } from './follow-event-by-user.command';
import { EventId, IEventFinder, EVENT_FINDER } from '@melomaniapp/nestjs/event';
import { IUserFinder, UserId, USER_FINDER } from '@melomaniapp/nestjs/user';
import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedBy, FollowedTo, FollowId } from '../../domain';

import { FollowDTO, FollowType } from '@melomaniapp/contracts/follow';
import { FOLLOW_FINDER, IFollowFinder } from '../services';

@CommandHandler(FollowEventByUserCommand)
export class FollowEventByUserHandler
  implements ICommandHandler<FollowEventByUserCommand>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: IUserFinder,
    @Inject(EVENT_FINDER)
    private readonly eventFinder: IEventFinder,
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: FollowEventByUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const eventId = EventId.fromString(command.eventId);

    if ((await this.followFinder.find(id)) instanceof FollowDTO) {
      throw IdAlreadyRegisteredError.withId(id);
    }

    if (!(await this.userFinder.find(userId))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.eventFinder.find(eventId))) {
      throw IdNotFoundError.withId(eventId);
    }

    const follow = Follow.byUserToEvent({
      id,
      followedBy: FollowedBy.with(userId, FollowType.User),
      followedTo: FollowedTo.with(eventId, FollowType.Event),
    });

    this.repository.save(follow);
  }
}
