import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Description,
  Email,
  EmailAlreadyTakenError,
  Establishment,
  EstablishmentAddress,
  EstablishmentId,
  GenreId,
  Name,
  OwnerId,
  Slug,
  SlugAlreadyTakenError,
} from '../../domain';
import { AddressAlreadyTakenError } from '../../domain/exception/address-already-taken.error';
import {
  ESTABLISHMENT_FINDER,
  IEstablishmentFinder,
} from '../services/establishment-finder.interface';
import { CreateEstablishmentCommand } from './create-establishment.command';

@CommandHandler(CreateEstablishmentCommand)
export class CreateEstablishmentHandler implements ICommandHandler {
  constructor(
    @InjectAggregateRepository(Establishment)
    public readonly establishments: AggregateRepository<
      Establishment,
      EstablishmentId
    >,
    @Inject(ESTABLISHMENT_FINDER)
    private readonly finder: IEstablishmentFinder
  ) {}

  async execute(command: CreateEstablishmentCommand) {
    const { full, city } = command.address;

    const establishmentId = EstablishmentId.fromString(command.establishmentId);
    const ownerId = OwnerId.fromString(command.ownerId);

    if (
      (await this.establishments.find(establishmentId)) instanceof Establishment
    ) {
      throw IdAlreadyRegisteredError.withId(establishmentId);
    }

    const name = Name.fromString(command.name);
    const slug = Slug.fromString(command.slug);
    const description = Description.fromString(command.description);
    const email = Email.fromString(command.email);
    const address = EstablishmentAddress.with(full, city);

    if (await this.finder.findOneBySlug(slug)) {
      throw SlugAlreadyTakenError.with(slug);
    }

    if (await this.finder.findOneByEmail(email)) {
      throw EmailAlreadyTakenError.with(email);
    }

    if (await this.finder.findOneByAddress(address)) {
      throw AddressAlreadyTakenError.with(address);
    }

    const establishment = Establishment.add(
      establishmentId,
      ownerId,
      name,
      slug,
      description,
      email,
      address
    );

    command.genreIds.map((genreId: string) =>
      establishment.addGenre(GenreId.fromString(genreId))
    );

    this.establishments.save(establishment);
  }
}
