import { FollowDTO } from '@melomaniapp/contracts/follow';
import { Controller, Put, Get, Param, Post, Query } from '@nestjs/common';
import { catchError } from 'rxjs';
import { v4 } from 'uuid';
import { FollowService } from '../services/follow.service';

@Controller('follows')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('users/:userId/follows_to/genres/:genreId')
  async followGenreByUser(
    @Param('userId') userId: string,
    @Param('genreId') genreId: string
  ) {
    try {
      return await this.followService.followGenreByUser({
        _id: v4(),
        followedById: userId,
        followedToId: genreId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Put(':followId/users/:userId/unfollows_to/genres/:genreId')
  async unfollowGenreByUser(
    @Param('followId') followId: string,
    @Param('userId') userId: string,
    @Param('genreId') genreId: string
  ) {
    try {
      return await this.followService.unfollowGenreByUser({
        _id: followId,
        unfollowedById: userId,
        unfollowedToId: genreId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Post('users/:userId/follows_to/artists/:artistId')
  async followArtistByUser(
    @Param('userId') userId: string,
    @Param('artistId') artistId: string
  ) {
    try {
      return await this.followService.followArtistByUser({
        _id: v4(),
        followedById: userId,
        followedToId: artistId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Put(':followId/users/:userId/unfollows_to/establishments/:artistId')
  async unfollowArtistByUser(
    @Param('followId') followId: string,
    @Param('userId') userId: string,
    @Param('artistId') artistId: string
  ) {
    try {
      return await this.followService.unfollowArtistByUser({
        _id: followId,
        unfollowedById: userId,
        unfollowedToId: artistId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Post('users/:userId/follows_to/establishments/:establishmentId')
  async followEstablishmentByUser(
    @Param('userId') userId: string,
    @Param('establishmentId') establishmentId: string
  ) {
    try {
      return await this.followService.followEstablishmentByUser({
        _id: v4(),
        followedById: userId,
        followedToId: establishmentId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Put(':followId/users/:userId/unfollows_to/establishments/:establishmentId')
  async unfollowEstablishmentByUser(
    @Param('followId') followId: string,
    @Param('userId') userId: string,
    @Param('establishmentId') establishmentId: string
  ) {
    try {
      return await this.followService.unfollowEstablishmentByUser({
        _id: followId,
        unfollowedById: userId,
        unfollowedToId: establishmentId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Post('users/:userId/follows_to/events/:eventId')
  async followEventByUser(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string
  ) {
    try {
      return await this.followService.followEventByUser({
        _id: v4(),
        followedById: userId,
        followedToId: eventId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Put(':followId/users/:userId/unfollows_to/events/:eventId')
  async unfollowEventByUser(
    @Param('followId') followId: string,
    @Param('userId') userId: string,
    @Param('eventId') eventId: string
  ) {
    try {
      return await this.followService.unfollowEventByUser({
        _id: followId,
        unfollowedById: userId,
        unfollowedToId: eventId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Post('artists/:byArtistId/follows_to/artists/:toArtistId')
  async followArtistByArtist(
    @Param('byArtistId') byArtistId: string,
    @Param('toArtistId') toArtistId: string
  ) {
    try {
      return await this.followService.followArtistByArtist({
        _id: v4(),
        followedById: byArtistId,
        followedToId: toArtistId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Put(':followId/artists/:byArtistId/unfollows_to/artists/:toArtistId')
  async unfollowArtistByArtist(
    @Param('followId') followId: string,
    @Param('byArtistId') byArtistId: string,
    @Param('toArtistId') toArtistId: string
  ) {
    try {
      return await this.followService.unfollowArtistByArtist({
        _id: followId,
        unfollowedById: byArtistId,
        unfollowedToId: toArtistId,
      });
    } catch (error) {
      throw catchError(error);
    }
  }

  @Get('events/:eventId')
  async getFollowersByEvent(
    @Param('eventId') eventId: string
  ): Promise<FollowDTO[]> {
    try {
      return await this.followService.getFollowersByEvent(eventId);
    } catch (error) {
      throw catchError(error);
    }
  }

  @Get('establishments/:establishmentId')
  async getFollowersByEstablishment(
    @Param('establishmentId') establishmentId: string
  ): Promise<FollowDTO[]> {
    try {
      return await this.followService.getFollowersByEstablishment(
        establishmentId
      );
    } catch (error) {
      throw catchError(error);
    }
  }

  @Get('artists/:artistId')
  async getFollowersByArtist(
    @Param('artistId') artistId: string
  ): Promise<FollowDTO[]> {
    try {
      return await this.followService.getFollowersByArtist(artistId);
    } catch (error) {
      throw catchError(error);
    }
  }

  @Get('genres/:genreId')
  async getFollowersByGenre(
    @Param('genreId') genreId: string
  ): Promise<FollowDTO[]> {
    try {
      return await this.followService.getFollowersByGenre(genreId);
    } catch (error) {
      throw catchError(error);
    }
  }
}
