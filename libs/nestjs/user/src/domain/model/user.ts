import { EncryptedAggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';

import {
  UserCityWasUpdated,
  UserGenreWasAdded,
  UserGenreWasRemoved,
  UserRoleWasAdded,
  UserRoleWasRemoved,
  UserWasCreated,
  UserWasDeleted,
} from '../event';
import { City } from './city';
import { Email } from './email';
import { GenreId } from './genre-id';
import { Role } from './role';
import { UserId } from './user-id';
import { Username } from './username';

export class User extends EncryptedAggregateRoot {
  private _userId: UserId;
  private _username: Username;
  private _email: Email;
  private _city: City;
  private _genres: GenreId[] = [];
  private _roles: Role[] = [];
  private _deleted?: Date;

  public static add(userId: UserId, username: Username, email: Email): User {
    const user = new User();

    user.apply(new UserWasCreated(userId.value, username.value, email.value));

    return user;
  }

  aggregateId(): string {
    return this.id.value;
  }

  get id(): UserId {
    return this._userId;
  }

  get username(): Username {
    return this._username;
  }

  get roles(): Role[] {
    return Array.from(this._roles);
  }

  get genres(): GenreId[] {
    return Array.from(this._genres);
  }

  get deleted(): boolean {
    return !!this._deleted;
  }

  hasGenre(genre: GenreId): boolean {
    return this._genres.some((item: GenreId) => item.equals(genre));
  }

  addGenre(genre: GenreId): void {
    if (this.hasGenre(genre)) {
      return;
    }

    this.apply(new UserGenreWasAdded(this.id.value, genre.value));
  }

  removeGenre(genre: GenreId): void {
    if (!this.hasGenre(genre)) {
      return;
    }

    this.apply(new UserGenreWasRemoved(this.id.value, genre.value));
  }

  hasRole(role: Role): boolean {
    return this._roles.some((item: Role) => item.equals(role));
  }

  addRole(role: Role): void {
    if (this.hasRole(role)) {
      return;
    }

    this.apply(new UserRoleWasAdded(this.id.value, role.value));
  }

  removeRole(role: Role): void {
    if (!this.hasRole(role)) {
      return;
    }

    this.apply(new UserRoleWasRemoved(this.id.value, role.value));
  }

  updateCity(city: City): void {
    if (this._city && this._city.equals(city)) {
      return;
    }

    this.apply(new UserCityWasUpdated(this.id.value, city.value));
  }

  delete(): void {
    if (this._deleted) {
      return;
    }

    this.apply(new UserWasDeleted(this.id.value));
  }

  private onUserWasCreated(event: UserWasCreated) {
    this._userId = UserId.fromString(event.id);
    this._username = Username.fromString(event.username);
    this._roles = [];
    this._deleted = null;
  }

  private onUserGenreWasAdded(event: UserGenreWasAdded) {
    this._genres.push(GenreId.fromString(event.genreId));
  }

  private onUserGenreWasRemoved(event: UserGenreWasRemoved) {
    this._genres = this._genres.filter(
      (item: GenreId) => !item.equals(GenreId.fromString(event.genreId))
    );
  }

  private onUserRoleWasAdded(event: UserRoleWasAdded) {
    this._roles.push(Role.fromString(event.role));
  }

  private onUserRoleWasRemoved(event: UserRoleWasRemoved) {
    this._roles = this._roles.filter(
      (item: Role) => !item.equals(Role.fromString(event.role))
    );
  }

  private onUserCityWasUpdated(event: UserCityWasUpdated) {
    this._city = City.fromString(event.city);
  }

  private onUserWasDeleted(event: UserWasDeleted) {
    this._deleted = new Date(event.metadata._ocurred_on);
  }
}
