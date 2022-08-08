import { ICommand } from '@nestjs/cqrs';

export class UnfollowArtistByUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly artistId: string
  ) {}
}
