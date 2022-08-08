import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnfollowEstablishmentByUserCommand } from './unfollow-establishment-by-user.command';
import {
  EstablishmentId,
  ESTABLISHMENT_FINDER,
  IEstablishmentFinder,
} from '@melomaniapp/nestjs/establishment';
import { IUserFinder, UserId, USER_FINDER } from '@melomaniapp/nestjs/user';
import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Follow, FollowedBy, FollowedTo, FollowId } from '../../domain';
import { FollowType } from '@melomaniapp/contracts/follow';

@CommandHandler(UnfollowEstablishmentByUserCommand)
export class UnfollowEstablishmentByUserHandler
  implements ICommandHandler<UnfollowEstablishmentByUserCommand>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: IUserFinder,
    @Inject(ESTABLISHMENT_FINDER)
    private readonly establishmentFinder: IEstablishmentFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: UnfollowEstablishmentByUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const establishmentId = EstablishmentId.fromString(command.establishmentId);

    const follow = await this.repository.find(id);

    if (!follow) {
      throw IdNotFoundError.withId(id);
    }

    if (!(await this.userFinder.find(userId))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.establishmentFinder.find(establishmentId))) {
      throw IdNotFoundError.withId(establishmentId);
    }

    follow.unfollowByUserToEstablishment({
      id,
      followedBy: FollowedBy.with(userId, FollowType.User),
      followedTo: FollowedTo.with(establishmentId, FollowType.Establishment),
    });

    this.repository.save(follow);
  }
}
