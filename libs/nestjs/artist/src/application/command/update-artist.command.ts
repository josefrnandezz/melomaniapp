import { ICommand } from '@nestjs/cqrs';

export class UpdateArtistCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly alias: string,
    public readonly socialLinks: string[]
  ) {}
}
