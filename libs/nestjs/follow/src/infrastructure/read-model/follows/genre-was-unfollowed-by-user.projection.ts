import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenreWasUnfollowedByUser } from '../../../domain';
import {
  FOLLOWS_USER_GENRE_PROJECTION,
  FollowUserGenreDocument,
} from './follow-user-genre.schema';

@EventsHandler(GenreWasUnfollowedByUser)
export class GenreWasUnfollowedByUserProjection
  implements IEventHandler<GenreWasUnfollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_USER_GENRE_PROJECTION)
    private readonly follows: Model<FollowUserGenreDocument>
  ) {}

  async handle(event: GenreWasUnfollowedByUser) {
    await this.follows.findByIdAndDelete(event.aggregateId).exec();
  }
}
