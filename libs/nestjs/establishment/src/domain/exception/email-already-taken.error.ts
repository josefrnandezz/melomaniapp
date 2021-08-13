import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

import { Email } from '../model';

export class EmailAlreadyTakenError extends DomainError {
  public static with(email: Email): EmailAlreadyTakenError {
    return new EmailAlreadyTakenError(`Email ${email.value} already taken`);
  }
}
