import { InjectModel } from '@nestjs/mongoose';
import { FOLLOWS_PROJECTION, FollowDocument } from '../read-model';
import { IFollowFinder } from '../../application/services/follow-finder.interface';
import { FollowId } from '../../domain';
import { Model } from 'mongoose';
import { FollowDTO, FollowType } from '@melomaniapp/contracts/follow';
import { Injectable } from '@nestjs/common';
import { EventId } from '@melomaniapp/nestjs/event';
import { ArtistId } from '@melomaniapp/nestjs/artist';
import { EstablishmentId } from 'libs/nestjs/event/src/domain';
import { GenreId } from '@melomaniapp/nestjs/genre';
import { UserId } from '@melomaniapp/nestjs/user';

@Injectable()
export class FollowFinder implements IFollowFinder {
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async find(id: FollowId): Promise<FollowDTO | null> {
    const follow = await this.follows.findById(id.value);

    if (!follow) {
      return null;
    }

    return new FollowDTO({ ...follow });
  }

  async findFollowersByEvent(id: EventId): Promise<FollowDTO[]> {
    const follows = await this.follows.find({
      followedToId: id.value,
      followedToType: FollowType.Event,
    });

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }

  async findFollowersByArtist(id: ArtistId): Promise<FollowDTO[]> {
    const follows = await this.follows.find({
      followedToId: id.value,
      followedToType: FollowType.Artist,
    });

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }

  async findFollowersByEstablishment(
    id: EstablishmentId
  ): Promise<FollowDTO[]> {
    const follows = await this.follows.find({
      followedToId: id.value,
      followedToType: FollowType.Establishment,
    });

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }

  async findFollowersByGenre(id: GenreId): Promise<FollowDTO[]> {
    const follows = await this.follows.find({
      followedToId: id.value,
      followedToType: FollowType.Genre,
    });

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }

  async findFollows(id: UserId, type: FollowType): Promise<FollowDTO[]> {
    const follows = await this.follows.find({
      followedById: id.value,
      followedByType: type,
    });

    if (!follows) {
      return [];
    }

    return follows.map((follow) => new FollowDTO({ ...follow }));
  }
}
