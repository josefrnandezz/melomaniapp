import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

import { Slug } from '../model';

export class SlugAlreadyTakenError extends DomainError {
  public static with(slug: Slug): SlugAlreadyTakenError {
    return new SlugAlreadyTakenError(`Slug ${slug.value} already taken`);
  }
}
