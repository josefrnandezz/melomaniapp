import { IQuery } from '@nestjs/cqrs';

export class GetEventsByCityQuery implements IQuery {
  public constructor(public readonly city: string) {}
}
