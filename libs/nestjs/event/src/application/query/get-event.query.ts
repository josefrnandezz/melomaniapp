import { IQuery } from '@nestjs/cqrs';

export class GetEventQuery implements IQuery {
  constructor(public readonly id: string) {}
}
