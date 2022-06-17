import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateArtistDTO, ArtistDTO } from '@melomaniapp/contracts/artist';
import { CreateArtistCommand, GetArtistQuery } from '../../application';

@Injectable()
export class ArtistService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(userId: string, artist: CreateArtistDTO): Promise<ArtistDTO> {
    const { _id, name, alias, description, socialLinks, genreIds } = artist;

    await this.commandBus.execute(
      new CreateArtistCommand(
        _id,
        userId,
        name,
        alias,
        description,
        socialLinks,
        genreIds
      )
    );

    return new ArtistDTO({ userId, ...artist });
  }

  async findOne(id: string): Promise<ArtistDTO> {
    return await this.queryBus.execute(new GetArtistQuery(id));
  }
}
