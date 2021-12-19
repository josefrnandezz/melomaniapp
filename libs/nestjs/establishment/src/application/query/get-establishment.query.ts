import { IQuery } from '@nestjs/cqrs';

export class GetEstablishmentQuery implements IQuery {
  constructor(public readonly id: string) {}
}
