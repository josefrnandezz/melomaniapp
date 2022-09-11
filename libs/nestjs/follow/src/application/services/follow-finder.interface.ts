import { FollowId } from '../../domain';
import { FollowDTO, FollowType } from '@melomaniapp/contracts/follow';
import { EventId } from '@melomaniapp/nestjs/event';
import { EstablishmentId } from '@melomaniapp/nestjs/establishment';
import { ArtistId } from '@melomaniapp/nestjs/artist';
import { GenreId } from '@melomaniapp/nestjs/genre';
import { UserId } from '@melomaniapp/nestjs/user';

export const FOLLOW_FINDER = 'FOLLOW_FINDER';

export interface IFollowFinder {
  find(id: FollowId): Promise<FollowDTO | null>;
  findFollowersByEvent(eventId: EventId): Promise<FollowDTO[]>;
  findFollowersByEstablishment(
    establishmentId: EstablishmentId
  ): Promise<FollowDTO[]>;
  findFollowersByArtist(artistId: ArtistId): Promise<FollowDTO[]>;
  findFollowersByGenre(artistId: GenreId): Promise<FollowDTO[]>;
  findFollows(userId: UserId, type: FollowType): Promise<FollowDTO[]>;
}
