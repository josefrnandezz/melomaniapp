import { ICommand } from '@nestjs/cqrs';

export class UpdateEventCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly startsAt: Date,
    public readonly endsAt: Date,
    public readonly artistIds: string[],
    public readonly genreIds: string[]
  ) {}
}
