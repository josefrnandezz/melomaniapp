import { ICommand } from '@nestjs/cqrs';

export class UnfollowEstablishmentByUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly establishmentId: string
  ) {}
}
