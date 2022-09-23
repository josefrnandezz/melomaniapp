import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ESTABLISHMENT_FINDER,
  IEstablishmentFinder,
} from '../services/establishment-finder.interface';
import { GetEstablishmentFromUserQuery } from './get-establishment-from-user.query';
import { UserId } from '@melomaniapp/nestjs/user';
import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';

@QueryHandler(GetEstablishmentFromUserQuery)
export class GetEstablishmentFromUserHandler
  implements IQueryHandler<GetEstablishmentFromUserQuery>
{
  constructor(
    @Inject(ESTABLISHMENT_FINDER)
    public readonly finder: IEstablishmentFinder
  ) {}

  async execute(
    query: GetEstablishmentFromUserQuery
  ): Promise<EstablishmentDTO> {
    const establishment = this.finder.findOneByUser(
      UserId.fromString(query.userId)
    );

    if (!establishment) {
      throw new IdNotFoundError(
        `The establishment of the user ${query.userId} was not found`
      );
    }

    return establishment;
  }
}
