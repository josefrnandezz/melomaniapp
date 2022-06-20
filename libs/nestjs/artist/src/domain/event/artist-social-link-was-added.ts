import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type ArtistSocialLinkWasAddedProps = { socialLink: string };

export class ArtistSocialLinkWasAdded extends Event<ArtistSocialLinkWasAddedProps> {
  constructor(public readonly id: string, public readonly socialLink: string) {
    super(id, { socialLink });
  }
}
