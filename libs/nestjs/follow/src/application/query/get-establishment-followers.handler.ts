import { FollowDTO } from '@melomaniapp/contracts/follow';
import { EstablishmentId } from '@melomaniapp/nestjs/establishment';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FOLLOW_FINDER, IFollowFinder } from '../services';
import { GetEstablishmentFollowersQuery } from './get-establishment-followers.query';

@QueryHandler(GetEstablishmentFollowersQuery)
export class GetEstablishmentFollowersHandler
  implements IQueryHandler<GetEstablishmentFollowersQuery>
{
  constructor(
    @Inject(FOLLOW_FINDER)
    private readonly followFinder: IFollowFinder
  ) {}
  async execute(query: GetEstablishmentFollowersQuery): Promise<FollowDTO[]> {
    return await this.followFinder.findFollowersByEstablishment(
      EstablishmentId.fromString(query.establishmentId)
    );
  }
}
