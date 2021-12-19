import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserCityWasUpdated } from '../../../domain';
import { UserDocument, USERS_PROJECTION } from './user.schema';

@EventsHandler(UserCityWasUpdated)
export class UserCityWasUpdatedProjection
  implements IEventHandler<UserCityWasUpdated>
{
  constructor(
    @InjectModel(USERS_PROJECTION)
    private readonly users: Model<UserDocument>
  ) {}

  handle(event: UserCityWasUpdated) {
    this.users
      .findByIdAndUpdate(event.aggregateId, {
        city: event.city,
      })
      .exec();
  }
}
