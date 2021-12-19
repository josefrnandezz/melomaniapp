import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  ESTABLISHMENT_FINDER,
  IEstablishmentFinder,
} from '../services/establishment-finder.interface';
import { GetEstablishmentsQuery } from './get-establishments.query';

@QueryHandler(GetEstablishmentsQuery)
export class GetEstablishmentsHandler
  implements IQueryHandler<GetEstablishmentsQuery>
{
  constructor(
    @Inject(ESTABLISHMENT_FINDER)
    private readonly finder: IEstablishmentFinder
  ) {}

  async execute(query: GetEstablishmentsQuery): Promise<EstablishmentDTO[]> {
    return await this.finder.findAll();
  }
}
