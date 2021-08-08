import { CreateGenreDTO } from '@melomaniapp/contracts/genre';
import { ICommand } from '@nestjs/cqrs';

export class CreateGenreCommand implements ICommand {
  constructor(public readonly genreDTO: CreateGenreDTO) {}
}
