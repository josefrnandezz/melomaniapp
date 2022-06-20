import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type ArtistPersonalInfoWasUpdatedProps = {
  name: string;
  description: string;
};

export class ArtistPersonalInfoWasUpdated extends Event<ArtistPersonalInfoWasUpdatedProps> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string
  ) {
    super(id, {
      name,
      description,
    });
  }
}
