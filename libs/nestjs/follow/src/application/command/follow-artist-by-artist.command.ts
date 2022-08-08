import { ICommand } from '@nestjs/cqrs';

export class FollowArtistByArtistCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly byArtistId: string,
    public readonly toArtistId: string
  ) {}
}
