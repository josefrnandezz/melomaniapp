import { AddressProps } from '@melomaniapp/nestjs/common';
import { ICommand } from '@nestjs/cqrs';

export class CreateEventCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly startsAt: Date,
    public readonly endsAt: Date,
    public readonly address: AddressProps,
    public readonly artistIds: string[],
    public readonly establishmentId: string,
    public readonly genreIds: string[]
  ) {}
}
