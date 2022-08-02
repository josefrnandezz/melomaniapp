import { ICommand } from '@nestjs/cqrs';

export class CancelEventCommand implements ICommand {
  constructor(public readonly id: string) {}
}
