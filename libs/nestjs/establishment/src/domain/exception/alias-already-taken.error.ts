import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

import { Alias } from '../model';

export class AliasAlreadyTakenError extends DomainError {
  public static with(alias: Alias): AliasAlreadyTakenError {
    return new AliasAlreadyTakenError(`Slug ${alias.value} already taken`);
  }
}
