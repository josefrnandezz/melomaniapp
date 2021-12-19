import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';

import {
  Alias,
  Email,
  EstablishmentAddress,
  EstablishmentId,
  GenreId,
} from '../../domain';

export const ESTABLISHMENT_FINDER = 'ESTABLISHMENT_FINDER';

export interface IEstablishmentFinder {
  findAll(): Promise<EstablishmentDTO[]>;
  find(id: EstablishmentId): Promise<EstablishmentDTO>;
  findOneByAlias(alias: Alias): Promise<EstablishmentDTO>;
  findOneByEmail(email: Email): Promise<EstablishmentDTO>;
  findOneByAddress(address: EstablishmentAddress): Promise<EstablishmentDTO>;
  findByGenreId(genreId: GenreId): Promise<EstablishmentDTO[]>;
}
