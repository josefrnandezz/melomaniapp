import { ICommand } from '@nestjs/cqrs';

export class DeleteEstablishmentCommand implements ICommand {
  constructor(public readonly establishmentId: string) {}
}
