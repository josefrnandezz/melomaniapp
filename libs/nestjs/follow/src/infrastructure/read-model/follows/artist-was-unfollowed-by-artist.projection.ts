import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWasUnfollowedByArtist } from '../../../domain';
import { FollowDocument, FOLLOWS_PROJECTION } from './follows.schema';

@EventsHandler(ArtistWasUnfollowedByArtist)
export class ArtistWasUnfollowedByArtistProjection
  implements IEventHandler<ArtistWasUnfollowedByArtist>
{
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async handle(event: ArtistWasUnfollowedByArtist) {
    await this.follows.findByIdAndDelete(event.aggregateId).exec();
  }
}
