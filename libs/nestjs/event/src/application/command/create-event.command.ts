import { ICommand } from '@nestjs/cqrs';

export class CreateEventCommand implements ICommand {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly name: string,
    private readonly description,
    private readonly startsAt: Date,
    private readonly endsAt: string,
    private readonly location: string,
    private readonly isCancelled: boolean
  ) {}
}
