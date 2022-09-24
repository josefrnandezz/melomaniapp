import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { FollowType } from '@melomaniapp/contracts/follow';
import {
  ArtistWasFollowedByUser,
  ArtistWasUnfollowedByUser,
  EstablishmentWasUnfollowedByUser,
  GenreWasFollowedByUser,
  EstablishmentWasFollowedByUser,
  GenreWasUnfollowedByUser,
  EventWasFollowedByUser,
  EventWasUnfollowedByUser,
  ArtistWasFollowedByArtist,
  ArtistWasUnfollowedByArtist,
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
      new ArtistWasUnfollowedByUser(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );
  }

  public static byUserToEstablishment(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): Follow {
    Follow.verifyCanFollow(args.followedBy, args.followedTo);

    const follow = new Follow();

    follow.apply(
      new EstablishmentWasFollowedByUser(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );

    return follow;
  }

  public unfollowByUserToEstablishment(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): void {
    this.apply(
      new EstablishmentWasUnfollowedByUser(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );
  }

  public static byUserToEvent(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): Follow {
    Follow.verifyCanFollow(args.followedBy, args.followedTo);

    const follow = new Follow();

    follow.apply(
      new EventWasFollowedByUser(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );

    return follow;
  }

  public unfollowByUserToEvent(args: {
    id: FollowId;
    unfollowedBy: FollowedBy;
    unfollowedTo: FollowedTo;
  }): void {
    this.apply(
      new EventWasUnfollowedByUser(
        args.id.value,
        args.unfollowedBy.id,
        args.unfollowedTo.id
      )
    );
  }

  public static byArtistToArtist(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): Follow {
    Follow.verifyCanFollow(args.followedBy, args.followedTo);

    const follow = new Follow();

    follow.apply(
      new ArtistWasFollowedByArtist(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );

    return follow;
  }

  public unfollowByArtistToArtist(args: {
    id: FollowId;
    followedBy: FollowedBy;
    followedTo: FollowedTo;
  }): void {
    this.apply(
      new ArtistWasUnfollowedByArtist(
        args.id.value,
        args.followedBy.id,
        args.followedTo.id
      )
    );
  }

  private static verifyCanFollow(by: FollowedBy, to: FollowedTo): void {
    if (
      !allowedFollows.find(
        (follow) => follow.by === by.type && follow.to === to.type
      )
    ) {
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

  private onEstablishmentWasFollowedByUser(
    event: EstablishmentWasFollowedByUser
  ): void {
    const byId = FollowedById.fromString(event.userId);
    const toId = FollowedToId.fromString(event.establishmentId);

    this._id = FollowId.fromString(event.id);
    this._followedBy = FollowedBy.with(byId, FollowType.User);
    this._followedTo = FollowedTo.with(toId, FollowType.Establishment);
    this._isDeleted = false;
  }

  private onEstablishmentWasUnfollowedByUser(
    event: EstablishmentWasUnfollowedByUser
  ): void {
    this._isDeleted = true;
  }

  private onEventWasFollowedByUser(event: EventWasFollowedByUser): void {
    const byId = FollowedById.fromString(event.userId);
    const toId = FollowedToId.fromString(event.eventId);

    this._id = FollowId.fromString(event.id);
    this._followedBy = FollowedBy.with(byId, FollowType.User);
    this._followedTo = FollowedTo.with(toId, FollowType.Event);
    this._isDeleted = false;
  }

  private onEventWasUnfollowedByUser(
    event: EstablishmentWasUnfollowedByUser
  ): void {
    this._isDeleted = true;
  }

  private onArtistWasFollowedByArtist(event: ArtistWasFollowedByArtist): void {
    const byId = FollowedById.fromString(event.byArtistId);
    const toId = FollowedToId.fromString(event.toArtistId);

    this._id = FollowId.fromString(event.id);
    this._followedBy = FollowedBy.with(byId, FollowType.Artist);
    this._followedTo = FollowedTo.with(toId, FollowType.Artist);
    this._isDeleted = false;
  }

  private onArtistWasUnfollowedByArtist(
    event: ArtistWasUnfollowedByArtist
  ): void {
    this._isDeleted = true;
  }
}
