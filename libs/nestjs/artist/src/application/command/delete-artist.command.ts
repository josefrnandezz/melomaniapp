import { ICommand } from '@nestjs/cqrs';

export class DeleteArtistCommand implements ICommand {
  constructor(public readonly id: string) {}
}
