import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export interface GenreWasFollowedByUserProps {
  userId: string;
  genreId: string;
}

export class GenreWasFollowedByUser extends Event<GenreWasFollowedByUserProps> {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly genreId: string
  ) {
    super(id, {
      userId,
      genreId,
    });
  }
}
