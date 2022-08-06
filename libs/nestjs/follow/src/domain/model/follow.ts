import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { GenreId } from '@melomaniapp/nestjs/genre';
import { UserId } from '@melomaniapp/nestjs/user';
import { FollowType } from '@melomaniapp/contracts/follow';
import { GenreWasFollowedByUser, GenreWasUnfollowedByUser } from '../events';
import { InvalidFollowError } from '../exceptions';
import { FollowId } from './follow-id';
import { allowedFollows } from './follow-types';
import { FollowedFrom } from './followed-from';
import { FollowedFromId } from './followed-from-id';
import { FollowedTo } from './followed-to';
import { FollowedToId } from './followed-to-id';

export class Follow extends AggregateRoot {
  private _id: FollowId;
  private _from: FollowedFrom;
  private _to: FollowedTo;
  private _isDeleted: boolean;

  public aggregateId(): string {
    return this._id.value;
  }

  public static createFromUserToGenre({
    id,
    from,
    to,
  }: {
    id: FollowId;
    from: FollowedFrom;
    to: FollowedTo;
  }): Follow {
    Follow.verifyCanFollow(from, to);

    const follow = new Follow();

    follow.apply(
      new GenreWasFollowedByUser(id.value, from.id, from.type, to.id, to.type)
    );

    return follow;
  }

  public static deleteFromUserToGenre(id: FollowId): void {
    this.apply(new GenreWasUnfollowedByUser(id.value));
  }

  private static verifyCanFollow(from: FollowedFrom, to: FollowedTo): void {
    if (!allowedFollows.includes({ from: from.type, to: to.type })) {
      throw InvalidFollowError.becauseFollowIsNotAllowed(from.type, to.type);
    }
  }

  private onGenreWasFollowedByUser(event: GenreWasFollowedByUser): void {
    const fromId = FollowedFromId.fromString(event.followedFromId);
    const toId = FollowedToId.fromString(event.followedToId);

    this._id = FollowId.fromString(event.id);
    this._from = FollowedFrom.with(fromId, event.followedFromType);
    this._to = FollowedTo.with(toId, event.followedToType);
    this._isDeleted = false;
  }

  private onGenreWasUnfollowedByUser(event: GenreWasUnfollowedByUser): void {
    this._isDeleted = true;
  }
}
