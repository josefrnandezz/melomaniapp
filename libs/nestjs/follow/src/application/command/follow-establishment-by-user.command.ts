import { ICommand } from '@nestjs/cqrs';

export class FollowEstablishmentByUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly establishmentId: string
  ) {}
}
