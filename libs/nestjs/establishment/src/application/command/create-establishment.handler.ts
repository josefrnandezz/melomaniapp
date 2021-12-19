import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Alias,
  AliasAlreadyTakenError,
  Description,
  Email,
  EmailAlreadyTakenError,
  Establishment,
  EstablishmentAddress,
  EstablishmentId,
  GenreId,
  Name,
  OwnerId,
} from '../../domain';
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

  async execute(command: CreateEstablishmentCommand): Promise<void> {
    const { full, city } = command.address;

    const establishmentId = EstablishmentId.fromString(command.establishmentId);
    const ownerId = OwnerId.fromString(command.ownerId);

    if (
      (await this.establishments.find(establishmentId)) instanceof Establishment
    ) {
      throw IdAlreadyRegisteredError.withId(establishmentId);
    }

    const name = Name.fromString(command.name);
    const alias = Alias.fromString(command.alias);
    const description = Description.fromString(command.description);
    const email = Email.fromString(command.email);
    const address = EstablishmentAddress.with(full, city);

    if (await this.finder.findOneByAlias(alias)) {
      throw AliasAlreadyTakenError.with(alias);
    }

    if (await this.finder.findOneByEmail(email)) {
      throw EmailAlreadyTakenError.with(email);
    }

    const establishment = Establishment.add(
      establishmentId,
      ownerId,
      name,
      alias,
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
