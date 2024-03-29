export const ROLES_KEY = 'roles';

export enum Role {
  Admin = 'ROLE_ADMIN',
  User = 'ROLE_USER',
  EstablishmentOwner = 'ROLE_ESTABLISHMENT_OWNER',
  UserOwner = 'USER_OWNER',
  ArtistOwner = 'ROLE_ARTIST_OWNER',
  EventOwner = 'ROLE_EVENT_OWNER',
}

export enum Resource {
  Establishment = 'establishment',
  User = 'user',
  Artist = 'artist',
  Event = 'event',
}
