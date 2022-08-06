import { FollowType } from '@melomaniapp/contracts/follow';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenreWasUnfollowedByUser } from '../../../domain';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(GenreWasUnfollowedByUser)
export class GenreWasUnfollowedByUserProjection
  implements IEventHandler<GenreWasUnfollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async handle(event: GenreWasUnfollowedByUser) {
    await this.follows.findByIdAndDelete(event.id).exec();
  }
}
