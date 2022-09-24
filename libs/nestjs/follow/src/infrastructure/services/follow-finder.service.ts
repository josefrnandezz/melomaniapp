import { InjectModel } from '@nestjs/mongoose';
import { FOLLOWS_PROJECTION, FollowDocument } from '../read-model';
import { IFollowFinder } from '../../application/services/follow-finder.interface';
import { FollowId } from '../../domain';
import { Model } from 'mongoose';
import {
  FollowArtistArtistDTO,
  FollowDTO,
  FollowType,
  FollowUserArtistDTO,
  FollowUserEstablishmentDTO,
  FollowUserEventDTO,
  FollowUserGenreDTO,
} from '@melomaniapp/contracts/follow';
import { Injectable } from '@nestjs/common';
import { EventId } from '@melomaniapp/nestjs/event';
import { ArtistId } from '@melomaniapp/nestjs/artist';
import { EstablishmentId } from 'libs/nestjs/event/src/domain';
import { GenreId } from '@melomaniapp/nestjs/genre';
import { UserId } from '@melomaniapp/nestjs/user';
import {
  FOLLOWS_USER_ESTABLISHMENT_PROJECTION,
  FollowUserEstablishmentDocument,
} from '../read-model/follows/follow-user-establishment.schema';
import {
  FOLLOWS_USER_GENRE_PROJECTION,
  FollowUserGenreDocument,
} from '../read-model/follows/follow-user-genre.schema';
import {
  FOLLOWS_USER_EVENT_PROJECTION,
  FollowUserEventDocument,
} from '../read-model/follows/follow-user-event';
import {
  FOLLOWS_USER_ARTIST_PROJECTION,
  FollowUserArtistDocument,
} from '../read-model/follows/follow-user-artist.schema';
import {
  FollowArtistArtistDocument,
  FOLLOWS_ARTIST_ARTIST_PROJECTION,
} from '../read-model/follows/follow-artist-artist.schema';

@Injectable()
export class FollowFinder implements IFollowFinder {
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>,
    @InjectModel(FOLLOWS_USER_ESTABLISHMENT_PROJECTION)
    private readonly followsUserEstablishment: Model<FollowUserEstablishmentDocument>,
    @InjectModel(FOLLOWS_USER_GENRE_PROJECTION)
    private readonly followsUserGenre: Model<FollowUserGenreDocument>,
    @InjectModel(FOLLOWS_USER_EVENT_PROJECTION)
    private readonly followsUserEvent: Model<FollowUserEventDocument>,
    @InjectModel(FOLLOWS_USER_ARTIST_PROJECTION)
    private readonly followsUserArtist: Model<FollowUserArtistDocument>,
    @InjectModel(FOLLOWS_ARTIST_ARTIST_PROJECTION)
    private readonly followsArtistArtist: Model<FollowArtistArtistDocument>
  ) {}

  async find(id: FollowId): Promise<FollowDTO | null> {
    const follow = await this.follows.findById(id.value).lean<FollowDocument>();

    if (!follow) {
      return null;
    }

    return new FollowDTO({ ...follow });
  }

  async findFollowersByEvent(id: EventId): Promise<FollowDTO[]> {
    const follows = await this.follows
      .find({
        followedToId: id.value,
        followedToType: FollowType.Event,
      })
      .lean<FollowDocument[]>();

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }

  async findFollowersByArtist(id: ArtistId): Promise<FollowDTO[]> {
    const follows = await this.follows
      .find({
        followedToId: id.value,
        followedToType: FollowType.Artist,
      })
      .lean<FollowDocument[]>();

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }

  async findFollowersByEstablishment(
    id: EstablishmentId
  ): Promise<FollowDTO[]> {
    const follows = await this.follows
      .find({
        followedToId: id.value,
        followedToType: FollowType.Establishment,
      })
      .lean<FollowDocument[]>();

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }

  async findFollowersByGenre(id: GenreId): Promise<FollowDTO[]> {
    const follows = await this.follows
      .find({
        followedToId: id.value,
        followedToType: FollowType.Genre,
      })
      .lean<FollowDocument[]>();

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }

  async findUserEstablishmentFollows(
    id: UserId
  ): Promise<FollowUserEstablishmentDTO[]> {
    const follows = await this.followsUserEstablishment
      .find({
        followedById: id.value,
      })
      .lean<FollowUserEstablishmentDTO[]>();

    if (!follows) {
      return [];
    }

    return follows;
  }

  async findUserGenreFollows(id: UserId): Promise<FollowUserGenreDTO[]> {
    const follows = await this.followsUserGenre
      .find({
        followedById: id.value,
      })
      .lean<FollowUserGenreDTO[]>();

    if (!follows) {
      return [];
    }

    return follows;
  }

  async findUserEventFollows(id: UserId): Promise<FollowUserEventDTO[]> {
    const follows = await this.followsUserEvent
      .find({
        followedById: id.value,
      })
      .lean<FollowUserEventDTO[]>();

    if (!follows) {
      return [];
    }

    return follows;
  }

  async findUserArtistFollows(id: UserId): Promise<FollowUserArtistDTO[]> {
    const follows = await this.followsUserArtist
      .find({
        followedById: id.value,
      })
      .lean<FollowUserArtistDTO[]>();

    if (!follows) {
      return [];
    }

    return follows;
  }

  async findArtistArtistFollows(
    id: ArtistId
  ): Promise<FollowArtistArtistDTO[]> {
    const follows = await this.followsArtistArtist
      .find({
        followedById: id.value,
      })
      .lean<FollowArtistArtistDTO[]>();

    if (!follows) {
      return [];
    }

    return follows;
  }
}
