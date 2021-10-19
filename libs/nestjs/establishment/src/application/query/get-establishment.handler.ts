import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { EstablishmentId } from '../../domain';
import {
  ESTABLISHMENT_FINDER,
  IEstablishmentFinder,
} from '../services/establishment-finder.interface';
import { GetEstablishmentQuery } from './get-establishment.query';

@QueryHandler(GetEstablishmentQuery)
export class GetEstablishmentHandler
  implements IQueryHandler<GetEstablishmentQuery>
{
  constructor(
    @Inject(ESTABLISHMENT_FINDER)
    private readonly finder: IEstablishmentFinder
  ) {}

  async execute(query: GetEstablishmentQuery): Promise<EstablishmentDTO> {
    const establishmentId = EstablishmentId.fromString(query.id);

    const establishment = await this.finder.find(establishmentId);

    if (!establishment) {
      throw IdNotFoundError.withId(establishmentId);
    }

    return establishment;
  }
}
