import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';
import { FollowType } from '../model/follow-type.';

export class InvalidFollowError extends DomainError {
  public static becauseFollowIsNotAllowed(
    from: FollowType,
    to: FollowType
  ): InvalidFollowError {
    return new InvalidFollowError(
      `The follow from ${FollowType[from]} to ${FollowType[to]} is not allowed`
    );
  }
}
