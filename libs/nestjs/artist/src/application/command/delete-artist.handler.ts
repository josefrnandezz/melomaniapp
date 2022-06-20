import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Artist, ArtistId } from '../../domain';
import { DeleteArtistCommand } from './delete-artist.command';

@CommandHandler(DeleteArtistCommand)
export class DeleteArtistHandler
  implements ICommandHandler<DeleteArtistCommand>
{
  constructor(
    @InjectAggregateRepository(Artist)
    private readonly artists: AggregateRepository<Artist, ArtistId>
  ) {}

  async execute(command: DeleteArtistCommand): Promise<void> {
    const id = ArtistId.fromString(command.id);
    const artist = await this.artists.find(id);

    if (!artist) {
      throw IdNotFoundError.withId(id);
    }

    artist.delete();

    await this.artists.delete(artist);
  }
}
