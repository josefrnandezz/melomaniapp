import { IQuery } from '@nestjs/cqrs';

export class GetEstablishmentFollowersQuery implements IQuery {
  constructor(public readonly establishmentId: string) {}
}
