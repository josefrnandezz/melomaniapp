import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

import { GenreName } from '../model';

export class GenreNameAlreadyTakenError extends DomainError {
  public static with(name: GenreName): GenreNameAlreadyTakenError {
    return new GenreNameAlreadyTakenError(
      `Genre name ${name.value} already taken`
    );
  }
}
