import { ICommand } from '@nestjs/cqrs';

export class UpdateGenreCommand implements ICommand {
  constructor(
    public readonly genreId: string,
    public readonly genreName: string
  ) {}
}
