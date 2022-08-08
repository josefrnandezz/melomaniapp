import { ICommand } from '@nestjs/cqrs';

export class FollowArtistByUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly artistId: string
  ) {}
}
