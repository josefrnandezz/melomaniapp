import {
  AggregateRepository,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Description,
  Email,
  Establishment,
  EstablishmentAddress,
  EstablishmentId,
  Name,
  Slug,
} from '../../domain';
import { CreateEstablishmentCommand } from './create-establishment.command';

@CommandHandler(CreateEstablishmentCommand)
export class CreateEstablishmentHandler implements ICommandHandler {
  constructor(
    @InjectAggregateRepository(Establishment)
    public readonly establishments: AggregateRepository<
      Establishment,
      EstablishmentId
    >
  ) {}

  async execute(command: CreateEstablishmentCommand) {
    const { street, number, postalCode, city, country } = command.address;

    const establishmentId = EstablishmentId.fromString(command.id);
    const ownerId = command.ownerId;
    const name = Name.fromString(command.name);
    const slug = Slug.fromString(command.slug);
    const email = Email.fromString(command.email);
    const description = Description.fromString(command.description);
    const address = EstablishmentAddress.with(
      street,
      number,
      postalCode,
      city,
      country
    );
    const genreIds = command.genreIds;
  }
}
