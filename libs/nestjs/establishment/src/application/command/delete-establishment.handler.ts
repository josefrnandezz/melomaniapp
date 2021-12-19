import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Establishment, EstablishmentId } from '../../domain';
import { DeleteEstablishmentCommand } from './delete-establishment.command';

@CommandHandler(DeleteEstablishmentCommand)
export class DeleteEstablishmentHandler
  implements ICommandHandler<DeleteEstablishmentCommand>
{
  constructor(
    @InjectAggregateRepository(Establishment)
    public readonly establishments: AggregateRepository<
      Establishment,
      EstablishmentId
    >
  ) {}

  async execute(command: DeleteEstablishmentCommand): Promise<void> {
    const establishmentId = EstablishmentId.fromString(command.establishmentId);

    const establishment = await this.establishments.find(establishmentId);

    if (!establishment || establishment.deleted) {
      throw IdNotFoundError.withId(establishmentId);
    }

    establishment.delete();

    this.establishments.save(establishment);
  }
}
