import { FollowType } from '@melomaniapp/contracts/follow';
import { GenreDocument, GENRES_PROJECTION } from '@melomaniapp/nestjs/genre';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenreWasFollowedByUser } from '../../../domain';
import {
  FOLLOWS_USER_GENRE_PROJECTION,
  FollowUserGenreDocument,
} from './follow-user-genre.schema';

@EventsHandler(GenreWasFollowedByUser)
export class GenreWasFollowedByUserProjection
  implements IEventHandler<GenreWasFollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_USER_GENRE_PROJECTION)
    private readonly follows: Model<FollowUserGenreDocument>,
    @InjectModel(GENRES_PROJECTION)
    private readonly genres: Model<GenreDocument>
  ) {}

  async handle(event: GenreWasFollowedByUser) {
    const genre = await this.genres.findById(event.payload.followedToId).lean();

    const follow = new this.follows({
      _id: event.payload._id,
      followedById: event.payload.followedById,
      followedToId: event.payload.followedToId,
      genre: { name: genre.name },
    });

    await follow.save();
  }
}
