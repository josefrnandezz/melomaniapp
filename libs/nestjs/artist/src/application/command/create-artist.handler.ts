import {
  AggregateRepository,
  IdAlreadyRegisteredError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Alias, Description } from '@melomaniapp/nestjs/common';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Artist,
  ArtistAliasAlreadyTakenError,
  ArtistId,
  ArtistName,
  GenreId,
  SocialLink,
  UserId,
} from '../../domain';
import { ARTIST_FINDER, IArtistFinder } from '../services';
import { CreateArtistCommand } from './create-artist.command';

@CommandHandler(CreateArtistCommand)
export class CreateArtistHandler
  implements ICommandHandler<CreateArtistCommand>
{
  constructor(
    @InjectAggregateRepository(Artist)
    private readonly artists: AggregateRepository<Artist, ArtistId>,
    @Inject(ARTIST_FINDER)
    private readonly finder: IArtistFinder
  ) {}

  async execute(command: CreateArtistCommand): Promise<void> {
    const id = ArtistId.fromString(command.id);

    if ((await this.artists.find(id)) instanceof Artist) {
      throw IdAlreadyRegisteredError.withId(id);
    }

    const alias = Alias.fromString(command.alias);

    if (await this.finder.findByAlias(alias)) {
      throw ArtistAliasAlreadyTakenError.with(alias);
    }

    const socialLinks = command.socialLinks.map((link) =>
      SocialLink.fromString(link)
    );

    const artist = Artist.add({
      id,
      userId: UserId.fromString(command.userId),
      name: ArtistName.fromString(command.name),
      alias: Alias.fromString(command.alias),
      description: Description.fromString(command.description),
      socialLinks,
    });

    command.genreIds.map((genre) => artist.addGenre(GenreId.fromString(genre)));

    this.artists.save(artist);
  }
}
