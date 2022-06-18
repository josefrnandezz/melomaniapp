import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type ArtistAliasWasUpdatedProps = { alias: string | undefined };

export class ArtistAliasWasUpdated extends Event<ArtistAliasWasUpdatedProps> {
  constructor(
    public readonly id: string,
    public readonly alias: string | undefined
  ) {
    super(id, {
      alias,
    });
  }
}
