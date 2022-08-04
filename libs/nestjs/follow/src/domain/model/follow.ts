import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { GenreId } from '@melomaniapp/nestjs/genre';
import { UserId } from '@melomaniapp/nestjs/user';
import { GenreWasFollowedByUser, GenreWasUnfollowedByUser } from '../events';
import { InvalidFollowError } from '../exceptions';
import { FollowId } from './follow-id';
import { allowedFollows, FollowType } from './follow-type.';
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

  public static createFromUserToGenre(args: {
    id: FollowId;
    userId: UserId;
    genreId: GenreId;
  }): Follow {
    const from = FollowedFrom.with(args.userId, FollowType.User);
    const to = FollowedTo.with(args.genreId, FollowType.Genre);

    Follow.verifyCanFollow(from, to);

    const follow = new Follow();

    follow.apply(new GenreWasFollowedByUser(args.id.value, from.id, to.id));

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
    const fromId = FollowedFromId.fromString(event.userId);
    const toId = FollowedToId.fromString(event.genreId);

    this._id = FollowId.fromString(event.id);
    this._from = FollowedFrom.with(fromId, FollowType.User);
    this._to = FollowedTo.with(toId, FollowType.Genre);
    this._isDeleted = false;
  }

  private onGenreWasUnfollowedByUser(event: GenreWasUnfollowedByUser): void {
    this._isDeleted = true;
  }
}
