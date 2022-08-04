import { ICommand } from '@nestjs/cqrs';

export class FollowGenreFromUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly genreId: string
  ) {}
}
