import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';
import { Alias } from '@melomaniapp/nestjs/common';

export class ArtistAliasAlreadyTakenError extends DomainError {
  public static with(alias: Alias): ArtistAliasAlreadyTakenError {
    return new ArtistAliasAlreadyTakenError(
      `Artist alias ${alias.value} already taken`
    );
  }
}
