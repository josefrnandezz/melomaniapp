import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  AddressAlreadyTakenError,
  Description,
  Email,
  EmailAlreadyTakenError,
  Establishment,
  EstablishmentAddress,
  EstablishmentId,
  GenreId,
  Name,
  Slug,
  SlugAlreadyTakenError,
} from '../../domain';
import {
  ESTABLISHMENT_FINDER,
  IEstablishmentFinder,
} from '../services/establishment-finder.interface';
import { UpdateEstablishmentCommand } from './update-establishment.command';

@CommandHandler(UpdateEstablishmentCommand)
export class UpdateEstablishmentHandler implements ICommandHandler {
  constructor(
    @InjectAggregateRepository(Establishment)
    public readonly establishments: AggregateRepository<
      Establishment,
      EstablishmentId
    >,
    @Inject(ESTABLISHMENT_FINDER)
    public readonly finder: IEstablishmentFinder
  ) {}

  async execute(command: UpdateEstablishmentCommand) {
    const id = EstablishmentId.fromString(command.id);
    const name = Name.fromString(command.name);
    const description = Description.fromString(command.description);
    const slug = Slug.fromString(command.slug);
    const address = EstablishmentAddress.with(
      command.address.full,
      command.address.city
    );
    const email = Email.fromString(command.email);

    const establishment = await this.establishments.find(id);

    if (!establishment || establishment.deleted) {
      throw IdNotFoundError.withId(id);
    }

    if (await this.finder.findOneBySlug(slug)) {
      throw SlugAlreadyTakenError.with(slug);
    }

    if (await this.finder.findOneByEmail(email)) {
      throw EmailAlreadyTakenError.with(email);
    }

    if (await this.finder.findOneByAddress(address)) {
      throw AddressAlreadyTakenError.with(address);
    }

    establishment.updateInfo(name, description);
    establishment.updateEmail(email);
    establishment.updateSlug(slug);
    establishment.updateAddress(address);
    this.updateGenres(establishment, command);

    this.establishments.save(establishment);
  }

  private updateGenres(
    establishment: Establishment,
    command: UpdateEstablishmentCommand
  ) {
    if (command.genres === undefined) {
      return;
    }

    establishment.genres.map(
      (genre) =>
        !command.genres.includes(genre.value) &&
        establishment.removeGenre(genre)
    );

    command.genres.map((genre) =>
      establishment.addGenre(GenreId.fromString(genre))
    );
  }
}
