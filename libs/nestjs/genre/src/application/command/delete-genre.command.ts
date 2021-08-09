import { ICommand } from '@nestjs/cqrs';

export class DeleteGenreCommand implements ICommand {
  constructor(public readonly genreId: string) {}
}
