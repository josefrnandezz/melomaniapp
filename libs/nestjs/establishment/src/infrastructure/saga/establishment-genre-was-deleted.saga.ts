import { GenreWasDeleted } from '@melomaniapp/nestjs/genre';
import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UpdateEstablishmentCommand } from '../../application';
import {
  ESTABLISHMENT_FINDER,
  IEstablishmentFinder,
} from '../../application/services/establishment-finder.interface';
import { GenreId } from '../../domain';

@EventsHandler(GenreWasDeleted)
export class EstablishmentGenreWasDeletedSaga
  implements IEventHandler<GenreWasDeleted>
{
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(ESTABLISHMENT_FINDER)
    private readonly finder: IEstablishmentFinder
  ) {}

  async handle(event: GenreWasDeleted): Promise<void> {
    const establishments = await this.finder.findByGenreId(
      GenreId.fromString(event.id)
    );

    establishments.forEach(
      ({ _id, name, alias, description, email, address, genreIds }) => {
        const genres = genreIds.filter((genreId) => genreId !== event.id);

        this.commandBus.execute(
          new UpdateEstablishmentCommand(
            _id,
            name,
            alias,
            description,
            email,
            address,
            genres
          )
        );
      }
    );
  }
}
