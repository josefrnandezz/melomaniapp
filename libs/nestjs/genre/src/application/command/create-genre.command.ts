import { ICommand } from '@nestjs/cqrs';

export class CreateGenreCommand implements ICommand {
  constructor(public readonly genreId: string, public readonly name: string) {}
}
