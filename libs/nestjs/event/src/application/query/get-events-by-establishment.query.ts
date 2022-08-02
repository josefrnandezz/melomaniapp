import { IQuery } from '@nestjs/cqrs';

export class GetEventsByEstablishmentQuery implements IQuery {
  constructor(public readonly establishmentId: string) {}
}
