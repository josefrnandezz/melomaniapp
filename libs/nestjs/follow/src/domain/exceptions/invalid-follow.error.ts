import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';
import { FollowType } from '@melomaniapp/contracts/follow';

export class InvalidFollowError extends DomainError {
  public static becauseFollowIsNotAllowed(
    followedBy: FollowType,
    followedTo: FollowType
  ): InvalidFollowError {
    return new InvalidFollowError(
      `The follow by ${FollowType[followedBy]} to ${FollowType[followedTo]} is not allowed`
    );
  }
}
