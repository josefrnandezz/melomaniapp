import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { EventId } from './event-id';
import { EventName } from './event-name';
import { Address, Description } from '@melomaniapp/nestjs/common';
import { ArtistId } from './artist-id';
import { EstablishmentId } from './establishment-id';
import { GenreId } from './genre-id';
import { UserId } from './user-id';
import { EventWasCreated } from '../event/event-was-created.event';
import {
  ArtistWasAdded,
  ArtistWasRemoved,
  GenreWasAdded,
  GenreWasRemoved,
} from '../event';

export class Event extends AggregateRoot {
  private _id: EventId;
  private _userId: UserId;
  private _name: EventName;
  private _description: Description;
  private _startsAt: Date;
  private _endsAt: Date;
  private readonly _artists: ArtistId[];
  private _establishment: EstablishmentId;
  private readonly _genres: GenreId[];
  private _address: Address;
  private _isCancelled: boolean;

  aggregateId(): string {
    return this._id.value;
  }

  public static add(args: {
    id: ArtistId;
    userId: UserId;
    name: EventName;
    description: Description;
    startsAt: Date;
    endsAt: Date;
    establishment: EstablishmentId;
    address: Address;
  }): Event {
    const event = new Event();

    event.apply(
      new EventWasCreated(
        args.id.value,
        args.userId.value,
        args.name.value,
        args.description.value,
        args.startsAt,
        args.endsAt,
        args.address.value,
        args.establishment.value
      )
    );

    return event;
  }

  private hasArtist(artistId: ArtistId): boolean {
    return this._artists.some((artist) => artist.equals(artistId));
  }

  public addArtist(artistId: ArtistId): void {
    if (this.hasArtist(artistId)) {
      return;
    }

    this.apply(new ArtistWasAdded(this.aggregateId(), artistId.value));
  }

  public removeArtist(artistId: ArtistId): void {
    if (!this.hasArtist(artistId)) {
      return;
    }

    this.apply(new ArtistWasRemoved(this.aggregateId(), artistId.value));
  }

  private hasGenre(genreId: GenreId): boolean {
    return this._genres.some((genre) => genre.equals(genreId));
  }

  public addGenre(genreId: GenreId): void {
    if (this.hasGenre(genreId)) {
      return;
    }

    this.apply(new GenreWasAdded(this.aggregateId(), genreId.value));
  }

  public removeGenre(genreId: GenreId): void {
    if (!this.hasGenre(genreId)) {
      return;
    }

    this.apply(new GenreWasRemoved(this.aggregateId(), genreId.value));
  }

  private onEventWasCreated(event: EventWasCreated): void {
    this._id = EventId.fromString(event.id);
    this._userId = EventId.fromString(event.userId);
    this._name = EventId.fromString(event.name);
    this._description = EventId.fromString(event.description);
    this._startsAt = event.startsAt;
    this._endsAt = event.endsAt;
    this._address = Address.with(event.address.full, event.address.city);
    this._establishment = EstablishmentId.fromString(event.establishmentId);
    this._isCancelled = false;
  }

  private onArtistWasAdded(event: ArtistWasAdded): void {
    this._artists.push(ArtistId.fromString(event.artistId));
  }

  private onArtistWasRemoved(event: ArtistWasRemoved): void {
    this._artists.filter(
      (id) => !id.equals(ArtistId.fromString(event.artistId))
    );
  }

  private onGenreWasAdded(event: GenreWasAdded): void {
    this._genres.push(GenreId.fromString(event.genreId));
  }

  private onGenreWasRemoved(event: GenreWasRemoved): void {
    this._genres.filter((id) => !id.equals(GenreId.fromString(event.genreId)));
  }
}
