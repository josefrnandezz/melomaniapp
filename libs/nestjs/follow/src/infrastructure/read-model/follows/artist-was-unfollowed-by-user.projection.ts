import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWasUnfollowedByUser } from '../../../domain';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(ArtistWasUnfollowedByUser)
export class ArtistWasUnfollowedByUserProjection
  implements IEventHandler<ArtistWasUnfollowedByUser>
{
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async handle(event: ArtistWasUnfollowedByUser) {
    await this.follows.findByIdAndDelete(event.aggregateId).exec();
  }
}
