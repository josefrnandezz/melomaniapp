import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type ArtistSocialLinkWasRemovedProps = { socialLink: string };

export class ArtistSocialLinkWasRemoved extends Event<ArtistSocialLinkWasRemovedProps> {
  constructor(public readonly id: string, public readonly socialLink: string) {
    super(id, { socialLink });
  }
}
