import { MailService } from '@melomaniapp/nestjs/mailer';
import { ArtistDocument, ARTISTS_PROJECTION } from '@melomaniapp/nestjs/artist';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWasFollowedByArtist, FollowedTo } from '../../../domain';
import {
  FollowArtistArtistDocument,
  FOLLOWS_ARTIST_ARTIST_PROJECTION,
} from './follow-artist-artist.schema';
import { UserDocument, USERS_PROJECTION } from '@melomaniapp/nestjs/user';

@EventsHandler(ArtistWasFollowedByArtist)
export class ArtistWasFollowedByArtistProjection
  implements IEventHandler<ArtistWasFollowedByArtist>
{
  constructor(
    @InjectModel(FOLLOWS_ARTIST_ARTIST_PROJECTION)
    private readonly follows: Model<FollowArtistArtistDocument>,
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>,
    @InjectModel(USERS_PROJECTION)
    private readonly users: Model<UserDocument>,
    private readonly mailService: MailService
  ) {}

  async handle(event: ArtistWasFollowedByArtist) {
    const followedTo = await this.artists
      .findById(event.payload.followedToId)
      .select({
        _id: true,
        name: true,
        alias: true,
        description: true,
        imageUrl: true,
        userId: true,
      })
      .lean();

    const followedBy = await this.artists
      .findById(event.payload.followedById)
      .select({
        _id: true,
        name: true,
        alias: true,
        description: true,
        imageUrl: true,
      })
      .lean();

    const follow = new this.follows({
      _id: event.payload._id,
      followedTo: {
        _id: followedTo._id,
        name: followedTo.name,
        alias: followedTo.alias,
        description: followedTo.description,
        imageUrl: followedTo.imageUrl,
      },
      followedBy: {
        _id: followedBy._id,
        name: followedBy.name,
        alias: followedBy.alias,
        description: followedBy.description,
        imageUrl: followedBy.imageUrl,
      },
    });

    await follow.save();

    const userToNotify = await this.users.findById(followedTo.userId).lean();

    await this.mailService.sendArtistFollowedArtist(userToNotify.email, {
      id: followedBy._id,
      name: followedBy.name,
    });
  }
}
