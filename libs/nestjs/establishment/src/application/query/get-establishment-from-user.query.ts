import { IQuery } from '@nestjs/cqrs';

export class GetEstablishmentFromUserQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
