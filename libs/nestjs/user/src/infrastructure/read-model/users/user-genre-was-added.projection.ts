import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserGenreWasAdded } from '../../../domain';
import { UserDocument, USERS_PROJECTION } from './user.schema';

@EventsHandler(UserGenreWasAdded)
export class UserGenreWasAddedProjection
  implements IEventHandler<UserGenreWasAdded>
{
  constructor(
    @InjectModel(USERS_PROJECTION)
    private readonly users: Model<UserDocument>
  ) {}

  async handle(event: UserGenreWasAdded) {
    this.users
      .findByIdAndUpdate(event.aggregateId, {
        $push: { genres: event.genreId },
      })
      .exec();
  }
}
