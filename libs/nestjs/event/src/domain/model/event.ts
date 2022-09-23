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
  EventDateWasChanged,
  EventInfoWasUpdated,
  EventWasCancelled,
  GenreWasAdded,
  GenreWasRemoved,
} from '../event';
import { EventDateError } from '../exception';

export class Event extends AggregateRoot {
  private _id: EventId;
  private _userId: UserId;
  private _name: EventName;
  private _description: Description;
  private _startsAt: Date;
  private _endsAt: Date;
  private readonly _artists: ArtistId[] = [];
  private _establishment: EstablishmentId;
  private readonly _genres: GenreId[] = [];
  private _address: Address;
  private _isCancelled: boolean;

  aggregateId(): string {
    return this._id.value;
  }

  public get genres(): GenreId[] {
    return this._genres;
  }

  public get artists(): ArtistId[] {
    return this._artists;
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

    Event.verifyDateIsValid(args.startsAt, args.endsAt);

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

  public changeDate(startsAt: Date, endsAt: Date): void {
    if (this._startsAt === startsAt && this._endsAt === endsAt) {
      return;
    }

    Event.verifyDateIsValid(startsAt, endsAt);

    this.apply(new EventDateWasChanged(this.aggregateId(), startsAt, endsAt));
  }

  public updateInfo(name: EventName, description: Description): void {
    if (this._name.equals(name) && this._description.equals(description)) {
      return;
    }

    this.apply(
      new EventInfoWasUpdated(this.aggregateId(), name.value, description.value)
    );
  }

  public cancel(): void {
    this.apply(new EventWasCancelled(this.aggregateId()));
  }

  private static verifyDateIsValid(startsAt: Date, endsAt: Date): void {
    if (endsAt < startsAt || startsAt === endsAt) {
      throw EventDateError.with(startsAt, endsAt);
    }
  }

  private onEventWasCreated(event: EventWasCreated): void {
    this._id = EventId.fromString(event.id);
    this._userId = UserId.fromString(event.userId);
    this._name = EventName.fromString(event.name);
    this._description = Description.fromString(event.description);
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

  private onEventDateWasChanged(event: EventDateWasChanged): void {
    this._startsAt = event.startsAt;
    this._endsAt = event.endsAt;
  }

  private onEventInfoWasUpdated(event: EventInfoWasUpdated): void {
    this._name = EventName.fromString(event.name);
    this._description = Description.fromString(event.description);
  }

  private onEventWasCancelled(event: EventWasCancelled): void {
    this._isCancelled = true;
  }
}
