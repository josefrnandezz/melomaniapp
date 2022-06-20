import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Alias } from '@melomaniapp/nestjs/common';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Artist,
  ArtistAliasAlreadyTakenError,
  ArtistId,
  SocialLink,
} from '../../domain';
import { ARTIST_FINDER, IArtistFinder } from '../services';
import { UpdateArtistCommand } from './update-artist.command';

@CommandHandler(UpdateArtistCommand)
export class UpdateArtistHandler
  implements ICommandHandler<UpdateArtistCommand>
{
  constructor(
    @InjectAggregateRepository(Artist)
    private readonly artists: AggregateRepository<Artist, ArtistId>,
    @Inject(ARTIST_FINDER)
    private readonly finder: IArtistFinder
  ) {}

  async execute(command: UpdateArtistCommand): Promise<void> {
    const id = ArtistId.fromString(command.id);
    const artist = await this.artists.find(id);

    if (!artist) {
      throw IdNotFoundError.withId(id);
    }

    const alias = Alias.fromString(command.alias);

    if (await this.finder.findByAlias(alias)) {
      throw ArtistAliasAlreadyTakenError.with(alias);
    }

    artist.updateAlias(alias);
    this.updateSocialLinks(artist, command);

    this.artists.save(artist);
  }

  private updateSocialLinks(artist: Artist, command: UpdateArtistCommand) {
    if (command.socialLinks === undefined) {
      return;
    }

    artist.socialLinks.map(
      (socialLink) =>
        !command.socialLinks.includes(socialLink.value) &&
        artist.removeSocialLink(socialLink)
    );

    command.socialLinks.map((socialLink) =>
      artist.addSocialLink(SocialLink.fromString(socialLink))
    );
  }
}
