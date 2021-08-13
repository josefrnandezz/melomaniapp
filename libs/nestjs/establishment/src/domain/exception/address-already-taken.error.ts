import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

import { EstablishmentAddress } from '../model';

export class AddressAlreadyTakenError extends DomainError {
  public static with(address: EstablishmentAddress) {
    return new AddressAlreadyTakenError(
      `Address ${address.full}, ${address.city} already taken`
    );
  }
}
