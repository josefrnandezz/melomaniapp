import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { IArtistFinder } from '../../application';
import { ArtistId } from '../../domain';
import { InjectModel } from '@nestjs/mongoose';
import { ArtistDocument, ARTISTS_PROJECTION } from '../read-model';
import { Model } from 'mongoose';
import { Alias } from '@melomaniapp/nestjs/common';

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
