import { ICommand } from '@nestjs/cqrs';

export class CreateArtistCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly alias: string,
    public readonly description: string,
    public readonly socialLinks: string[],
    public readonly genreIds: string[]
  ) {}
}
