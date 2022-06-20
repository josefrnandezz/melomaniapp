import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistSocialLinkWasAdded } from '../../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from './artist.schema';

@EventsHandler(ArtistSocialLinkWasAdded)
export class ArtistSocialLinkWasAddedProjection
  implements IEventHandler<ArtistSocialLinkWasAdded>
{
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistSocialLinkWasAdded) {
    await this.artists
      .findByIdAndUpdate(event.aggregateId, {
        $push: { socialLinks: event.socialLink },
      })
      .exec();
  }
}
