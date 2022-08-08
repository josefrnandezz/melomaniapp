import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowEstablishmentByUserCommand } from './follow-establishment-by-user.command';
import {
  EstablishmentId,
  IEstablishmentFinder,
  ESTABLISHMENT_FINDER,
} from '@melomaniapp/nestjs/establishment';
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

@CommandHandler(FollowEstablishmentByUserCommand)
export class FollowEstablishmentByUserHandler
  implements ICommandHandler<FollowEstablishmentByUserCommand>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly userFinder: IUserFinder,
    @Inject(ESTABLISHMENT_FINDER)
    private readonly establishmentFinder: IEstablishmentFinder,
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder,
    @InjectAggregateRepository(Follow)
    private readonly repository: AggregateRepository<Follow, FollowId>
  ) {}

  async execute(command: FollowEstablishmentByUserCommand): Promise<any> {
    const id = FollowId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const establishmentId = EstablishmentId.fromString(command.establishmentId);

    if ((await this.followFinder.find(id)) instanceof FollowDTO) {
      throw IdAlreadyRegisteredError.withId(id);
    }

    if (!(await this.userFinder.find(userId))) {
      throw IdNotFoundError.withId(userId);
    }

    if (!(await this.establishmentFinder.find(establishmentId))) {
      throw IdNotFoundError.withId(establishmentId);
    }

    const follow = Follow.byUserToEstablishment({
      id,
      followedBy: FollowedBy.with(userId, FollowType.User),
      followedTo: FollowedTo.with(establishmentId, FollowType.Establishment),
    });

    this.repository.save(follow);
  }
}
