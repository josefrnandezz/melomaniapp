import { Address } from '@melomaniapp/contracts/establishment';
import { ICommand } from '@nestjs/cqrs';

export class CreateEstablishmentCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly email: string,
    public readonly address: Address,
    public readonly genreIds: string[]
  ) {}
}
