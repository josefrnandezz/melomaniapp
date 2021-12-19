import { Address } from '@melomaniapp/contracts/establishment';
import { ICommand } from '@nestjs/cqrs';

export class UpdateEstablishmentCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly alias: string,
    public readonly description: string,
    public readonly email: string,
    public readonly address: Address,
    public readonly genres: string[]
  ) {}
}
