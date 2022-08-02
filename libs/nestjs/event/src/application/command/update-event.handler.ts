import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Description } from '@melomaniapp/nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArtistId, Event, EventId, EventName, GenreId } from '../../domain';
import { UpdateEventCommand } from './update-event.command';

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand> {
  constructor(
    @InjectAggregateRepository(Event)
    private readonly repository: AggregateRepository<Event, EventId>
  ) {}

  async execute(command: UpdateEventCommand): Promise<void> {
    const id = EventId.fromString(command.id);
    const event = await this.repository.find(id);

    if (!event) {
      throw IdNotFoundError.withId(id);
    }

    const name = EventName.fromString(command.name);
    const description = Description.fromString(command.description);

    event.updateInfo(name, description);
    event.changeDate(command.startsAt, command.endsAt);

    this.updateArtists(event, command);
    this.updateGenres(event, command);

    this.repository.save(event);
  }

  private updateGenres(event: Event, command: UpdateEventCommand) {
    if (command.genreIds === undefined) {
      return;
    }

    event.genres.map(
      (genre) =>
        !command.genreIds.includes(genre.value) && event.removeGenre(genre)
    );

    command.genreIds.map((genre) => event.addGenre(GenreId.fromString(genre)));
  }

  private updateArtists(event: Event, command: UpdateEventCommand) {
    if (command.artistIds === undefined) {
      return;
    }

    event.artists.map(
      (artist) =>
        !command.artistIds.includes(artist.value) && event.removeArtist(artist)
    );

    command.artistIds.map((artist) =>
      event.addArtist(ArtistId.fromString(artist))
    );
  }
}
