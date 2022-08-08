import { IQuery } from '@nestjs/cqrs';

export class GetEventFollowersQuery implements IQuery {
  constructor(public readonly eventId: string) {}
}
