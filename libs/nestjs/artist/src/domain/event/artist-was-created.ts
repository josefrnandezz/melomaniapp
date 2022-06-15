import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateArtistDTO } from '@melomaniapp/contracts/artist';

export interface ArtistWasCreatedProps extends CreateArtistDTO {
  userId: string;
}

export class ArtistWasCreated extends Event<ArtistWasCreatedProps> {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly alias: string,
    public readonly description: string,
    public readonly socialLinks: string[]
  ) {
    super(id, {
      _id: id,
      userId,
      name,
      alias,
      description,
      socialLinks,
      genreIds: [],
    });
  }
}
