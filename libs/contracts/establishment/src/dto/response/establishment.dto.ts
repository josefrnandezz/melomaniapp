import { GenreDTO } from '@melomaniapp/contracts/genre';

export class EstablishmentDTO {
  id: string;
  name: string;
  username: string;
  description: string;
  email: string;
  location: string;
  genres: GenreDTO[];
}
