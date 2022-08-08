import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnfollowEventByUserCommand } from './unfollow-event-by-user.command';
import { IUserFinder, UserId, USER_FINDER } from '@melomaniapp/nestjs/user';
import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedBy, FollowedTo, FollowId } from '../../domain';
import { FollowType } from '@melomaniapp/contracts/follow';
import { EVENT_FINDER, IEventFinder, EventId } from '@melomaniapp/nestjs/event';

@CommandHandler(UnfollowEventByUserCommand)
export class UnfollowEventByUserHandler
  implements ICommandHandler<UnfollowEventByUserCommand>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: IUserFinder,
    @Inject(EVENT_FINDER)
    private readonly eventFinder: IEventFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: UnfollowEventByUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const eventId = EventId.fromString(command.eventId);

    const follow = await this.repository.find(id);

    if (!follow) {
      throw IdNotFoundError.withId(id);
    }

    if (!(await this.userFinder.find(userId))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.eventFinder.find(eventId))) {
      throw IdNotFoundError.withId(eventId);
    }

    follow.unfollowByUserToEvent({
      id,
      followedBy: FollowedBy.with(userId, FollowType.User),
      followedTo: FollowedTo.with(eventId, FollowType.Event),
    });

    this.repository.save(follow);
  }
}
