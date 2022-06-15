import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';
import { Alias } from '@melomaniapp/nestjs/common';

export class AliasAlreadyTakenError extends DomainError {
  public static with(alias: Alias): AliasAlreadyTakenError {
    return new AliasAlreadyTakenError(`Alias ${alias.value} already taken`);
  }
}
