import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateGenreDTO } from '@melomaniapp/contracts/genre';

export class GenreWasCreated extends Event<CreateGenreDTO> {
  constructor(public readonly id: string, public readonly name: string) {
    super(id, {
      _id: id,
      name,
    });
  }
}
