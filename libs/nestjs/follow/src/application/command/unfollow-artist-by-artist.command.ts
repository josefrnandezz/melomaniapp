import { ICommand } from '@nestjs/cqrs';

export class UnfollowArtistByArtistCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly byArtistId: string,
    public readonly toArtistId: string
  ) {}
}
