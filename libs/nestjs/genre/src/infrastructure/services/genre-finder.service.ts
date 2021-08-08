import { GenreDTO } from '@melomaniapp/contracts/genre';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IGenreFinder } from '../../application/services';
import { GenreDocument, GENRES_PROJECTION } from '../read-model';

@Injectable()
export class GenreFinder implements IGenreFinder {
  constructor(
    @InjectModel(GENRES_PROJECTION)
    private readonly genres: Model<GenreDocument>
  ) {}

  async findAll(): Promise<GenreDTO[]> {
    const genres = await this.genres.find().lean();

    return genres.map((genre) => new GenreDTO(genre));
  }
}
