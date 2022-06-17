import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { Alias } from '@melomaniapp/nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IArtistFinder } from '../../application';
import { ArtistId } from '../../domain';
import { ArtistDocument, ARTISTS_PROJECTION } from '../read-model';

export class ArtistFinder implements IArtistFinder {
  constructor(
    @InjectModel(ARTISTS_PROJECTION)
    public readonly artists: Model<ArtistDocument>
  ) {}

  async find(id: ArtistId): Promise<ArtistDTO | null> {
    const artist = await this.artists.findById(id.value).lean();

    if (!artist) {
      return null;
    }

    return new ArtistDTO({ ...artist });
  }

  async findAll(): Promise<ArtistDTO[]> {
    const artists = await this.artists.find().lean();

    if (!artists) {
      return [];
    }

    return artists.map((artist) => new ArtistDTO({ ...artist }));
  }

  async findByAlias(alias: Alias): Promise<ArtistDTO | null> {
    const artist = await this.artists
      .findOne({
        alias: alias.value,
      })
      .lean();

    if (!artist) {
      return null;
    }

    return artist;
  }
}
