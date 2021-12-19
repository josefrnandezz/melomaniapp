import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserGenreWasRemoved } from '../../../domain';
import { UserDocument, USERS_PROJECTION } from './user.schema';

@EventsHandler(UserGenreWasRemoved)
export class UserGenreWasRemovedProjection
  implements IEventHandler<UserGenreWasRemoved>
{
  constructor(
    @InjectModel(USERS_PROJECTION)
    private readonly users: Model<UserDocument>
  ) {}

  async handle(event: UserGenreWasRemoved) {
    this.users
      .findByIdAndUpdate(event.aggregateId, {
        $pull: { genres: event.genreId },
      })
      .exec();
  }
}
