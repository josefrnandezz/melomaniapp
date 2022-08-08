import { ICommand } from '@nestjs/cqrs';

export class FollowEventByUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly eventId: string
  ) {}
}
