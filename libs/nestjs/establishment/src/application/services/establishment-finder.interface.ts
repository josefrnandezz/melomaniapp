import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';

import {
  Email,
  EstablishmentAddress,
  EstablishmentId,
  Slug,
} from '../../domain';

export const ESTABLISHMENT_FINDER = 'ESTABLISHMENT_FINDER';

export interface IEstablishmentFinder {
  findAll(): Promise<EstablishmentDTO[]>;
  find(id: EstablishmentId): Promise<EstablishmentDTO>;
  findOneBySlug(slug: Slug): Promise<EstablishmentDTO>;
  findOneByEmail(email: Email): Promise<EstablishmentDTO>;
  findOneByAddress(address: EstablishmentAddress): Promise<EstablishmentDTO>;
}
