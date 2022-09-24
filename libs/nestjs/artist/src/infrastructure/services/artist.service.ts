import {
  ArtistDTO,
  CreateArtistDTO,
  EditArtistDTO,
} from '@melomaniapp/contracts/artist';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateArtistCommand,
  DeleteArtistCommand,
  GetArtistQuery,
  UpdateArtistCommand,
} from '../../application';
import { GetArtistsQuery } from '../../application/query/get-artists-query';

@Injectable()
export class ArtistService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(userId: string, artist: CreateArtistDTO): Promise<ArtistDTO> {
    const { _id, name, alias, description, socialLinks, genreIds, imageUrl } =
      artist;

    await this.commandBus.execute(
      new CreateArtistCommand(
        _id,
        userId,
        name,
        alias,
        description,
        socialLinks,
        genreIds,
        imageUrl
      )
    );

    return new ArtistDTO({ userId, ...artist });
  }

  async findOne(id: string): Promise<ArtistDTO> {
    return await this.queryBus.execute(new GetArtistQuery(id));
  }

  async findAll(): Promise<ArtistDTO> {
    return await this.queryBus.execute(new GetArtistsQuery());
  }

  async update(id: string, artist: EditArtistDTO): Promise<ArtistDTO> {
    await this.commandBus.execute(
      new UpdateArtistCommand(
        id,
        artist.name,
        artist.alias,
        artist.description,
        artist.socialLinks,
        artist.genreIds
      )
    );

    const updatedArtist = await this.findOne(id);

    return new ArtistDTO({ ...updatedArtist });
  }

  async delete(id: string): Promise<void> {
    await this.commandBus.execute(new DeleteArtistCommand(id));
  }
}
