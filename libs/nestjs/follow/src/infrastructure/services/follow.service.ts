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
    const { _id, followedById: userId, followedToId: artistid } = follow;

    await this.commandBus.execute(
      new FollowArtistByUserCommand(_id, userId, artistid)
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
}
