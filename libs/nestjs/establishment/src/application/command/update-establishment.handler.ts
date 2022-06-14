import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Description } from '@melomaniapp/nestjs/common';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Alias,
  AliasAlreadyTakenError,
  Email,
  EmailAlreadyTakenError,
  Establishment,
  EstablishmentAddress,
  EstablishmentId,
  GenreId,
  Name,
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
    const alias = Alias.fromString(command.alias);
    const address = EstablishmentAddress.with(
      command.address.full,
      command.address.city
    );
    const email = Email.fromString(command.email);

    const establishment = await this.establishments.find(id);

    const establishmentAlias = await this.finder.findOneByAlias(alias);
    const establishmentEmail = await this.finder.findOneByEmail(email);

    if (!establishment || establishment.deleted) {
      throw IdNotFoundError.withId(id);
    }

    if (establishmentAlias && establishmentAlias._id !== command.id) {
      throw AliasAlreadyTakenError.with(alias);
    }

    if (establishmentEmail && establishmentEmail._id !== command.id) {
      throw EmailAlreadyTakenError.with(email);
    }

    establishment.updateInfo(name, description);
    establishment.updateEmail(email);
    establishment.updateAlias(alias);
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
