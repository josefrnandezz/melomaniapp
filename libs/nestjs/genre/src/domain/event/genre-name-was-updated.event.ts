import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { EditGenreDTO } from '@melomaniapp/contracts/genre';

export type GenreNameWasUpdatedProps = Pick<EditGenreDTO, 'name'>;

export class GenreNameWasUpdated extends Event<GenreNameWasUpdatedProps> {
  constructor(public readonly id: string, public readonly name: string) {
    super(id, { name });
  }
}
