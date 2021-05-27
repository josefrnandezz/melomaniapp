import { GenreDTO } from "../genre";

export class EditEstablishmentDTO {
  name: string;
  username: string;
  description: string;
  email: string;
  location: string;
  genres: GenreDTO[];
}