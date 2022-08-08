import {
  CreateFollowDTO,
  FollowDTO,
  FollowType,
  UnfollowDTO,
} from '@melomaniapp/contracts/follow';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  FollowGenreByUserCommand,
  FollowArtistByUserCommand,
  UnfollowGenreByUserCommand,
  UnfollowArtistByUserCommand,
  FollowArtistByArtistCommand,
} from '../../application';

@Injectable()
export class FollowService {
  constructor(private readonly commandBus: CommandBus) {}

  async followGenreByUser(follow: CreateFollowDTO): Promise<FollowDTO> {
    const { _id, followedById: userId, followedToId: genreId } = follow;

    await this.commandBus.execute(
      new FollowGenreByUserCommand(_id, userId, genreId)
    );

    return new FollowDTO({
      ...follow,
      followedByType: FollowType.User,
      followedToType: FollowType.Genre,
    });
  }

  async unfollowGenreByUser(unfollow: UnfollowDTO): Promise<void> {
    const { _id, unfollowedById: userId, unfollowedToId: genreId } = unfollow;

    return await this.commandBus.execute(
      new UnfollowGenreByUserCommand(_id, userId, genreId)
    );
  }

  async followArtistByUser(follow: CreateFollowDTO): Promise<FollowDTO> {
    const { _id, followedById: userId, followedToId: artistId } = follow;

    await this.commandBus.execute(
      new FollowArtistByUserCommand(_id, userId, artistId)
    );

    return new FollowDTO({
      ...follow,
      followedByType: FollowType.User,
      followedToType: FollowType.Artist,
    });
  }

  async unfollowArtistByUser(follow: UnfollowDTO): Promise<void> {
    const { _id, unfollowedById: userId, unfollowedToId: artistId } = follow;

    return await this.commandBus.execute(
      new UnfollowArtistByUserCommand(_id, userId, artistId)
    );
  }

  async followEstablishmentByUser(follow: CreateFollowDTO): Promise<FollowDTO> {
    const { _id, followedById: userId, followedToId: establishmentId } = follow;

    await this.commandBus.execute(
      new FollowArtistByUserCommand(_id, userId, establishmentId)
    );

    return new FollowDTO({
      ...follow,
      followedByType: FollowType.User,
      followedToType: FollowType.Establishment,
    });
  }

  async unfollowEstablishmentIdByUser(follow: UnfollowDTO): Promise<void> {
    const {
      _id,
      unfollowedById: userId,
      unfollowedToId: establishmentId,
    } = follow;

    return await this.commandBus.execute(
      new UnfollowArtistByUserCommand(_id, userId, establishmentId)
    );
  }

  async followEventByUser(follow: CreateFollowDTO): Promise<FollowDTO> {
    const { _id, followedById: userId, followedToId: eventId } = follow;

    await this.commandBus.execute(
      new FollowArtistByUserCommand(_id, userId, eventId)
    );

    return new FollowDTO({
      ...follow,
      followedByType: FollowType.User,
      followedToType: FollowType.Event,
    });
  }

  async unfollowEventIdByUser(follow: UnfollowDTO): Promise<void> {
    const { _id, unfollowedById: userId, unfollowedToId: eventId } = follow;

    return await this.commandBus.execute(
      new UnfollowArtistByUserCommand(_id, userId, eventId)
    );
  }

  async followArtistByArtist(follow: CreateFollowDTO): Promise<FollowDTO> {
    const {
      _id,
      followedById: fromArtistId,
      followedToId: toArtistId,
    } = follow;

    await this.commandBus.execute(
      new FollowArtistByArtistCommand(_id, fromArtistId, toArtistId)
    );

    return new FollowDTO({
      ...follow,
      followedByType: FollowType.Artist,
      followedToType: FollowType.Artist,
    });
  }

  async unfollowArtistByArtist(follow: UnfollowDTO): Promise<void> {
    const {
      _id,
      unfollowedById: fromArtistId,
      unfollowedToId: toArtistId,
    } = follow;

    return await this.commandBus.execute(
      new UnfollowArtistByUserCommand(_id, fromArtistId, toArtistId)
    );
  }
}
