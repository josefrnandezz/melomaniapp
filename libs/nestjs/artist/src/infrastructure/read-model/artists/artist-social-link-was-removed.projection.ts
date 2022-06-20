import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtistSocialLinkWasRemoved } from '../../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from './artist.schema';

@EventsHandler(ArtistSocialLinkWasRemoved)
export class ArtistSocialLinkWasRemovedProjection
  implements IEventHandler<ArtistSocialLinkWasRemoved>
{
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async handle(event: ArtistSocialLinkWasRemoved) {
    await this.artists
      .findByIdAndUpdate(event.aggregateId, {
        $pull: { socialLinks: event.socialLink },
      })
      .exec();
  }
}
