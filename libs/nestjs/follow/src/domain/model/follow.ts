import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { FollowType } from '@melomaniapp/contracts/follow';
import {
  ArtistWasFollowedByUser,
  ArtistWasUnfollowedByUser,
  GenreWasFollowedByUser,
  GenreWasUnfollowedByUser,
} from '../events';
import { InvalidFollowError } from '../exceptions';
import { FollowId } from './follow-id';
import { allowedFollows } from './follow-types';
import { FollowedBy } from './followed-by';
import { FollowedById } from './followed-by-id';
import { FollowedTo } from './followed-to';
import { FollowedToId } from './followed-to-id';

export class Follow extends AggregateRoot {
  private _id: FollowId;
  private _followedBy: FollowedBy;
  private _followedTo: FollowedTo;
  private _isDeleted: boolean;

  public aggregateId(): string {
    return this._id.value;
  }

  public static byUserToGenre(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): Follow {
    Follow.verifyCanFollow(args.followedBy, args.followedTo);

    const follow = new Follow();

    follow.apply(
      new GenreWasFollowedByUser(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );

    return follow;
  }

  public unfollowByUserToGenre(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): void {
    this.apply(
      new GenreWasUnfollowedByUser(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );
  }

  public static byUserToArtist(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): Follow {
    Follow.verifyCanFollow(args.followedBy, args.followedTo);

    const follow = new Follow();

    follow.apply(
      new ArtistWasFollowedByUser(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );

    return follow;
  }

  public unfollowByUserToArtist(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): void {
    this.apply(
      new ArtistWasFollowedByUser(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );
  }

  private static verifyCanFollow(by: FollowedBy, to: FollowedTo): void {
    if (!allowedFollows.includes({ by: by.type, to: to.type })) {
      throw InvalidFollowError.becauseFollowIsNotAllowed(by.type, to.type);
    }
  }

  private onGenreWasFollowedByUser(event: GenreWasFollowedByUser): void {
    const byId = FollowedById.fromString(event.userId);
    const toId = FollowedToId.fromString(event.genreId);

    this._id = FollowId.fromString(event.id);
    this._followedBy = FollowedBy.with(byId, FollowType.User);
    this._followedTo = FollowedTo.with(toId, FollowType.Genre);
    this._isDeleted = false;
  }

  private onGenreWasUnfollowedByUser(event: GenreWasUnfollowedByUser): void {
    this._isDeleted = true;
  }

  private onArtistWasFollowedByUser(event: ArtistWasFollowedByUser): void {
    const byId = FollowedById.fromString(event.userId);
    const toId = FollowedToId.fromString(event.artistId);

    this._id = FollowId.fromString(event.id);
    this._followedBy = FollowedBy.with(byId, FollowType.User);
    this._followedTo = FollowedTo.with(toId, FollowType.Artist);
    this._isDeleted = false;
  }

  private onArtistWasUnfollowedByUser(event: ArtistWasUnfollowedByUser): void {
    this._isDeleted = true;
  }
}
