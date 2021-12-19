import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IEstablishmentFinder } from '../../application/services/establishment-finder.interface';
import {
  Alias,
  Email,
  EstablishmentAddress,
  EstablishmentId,
  GenreId,
} from '../../domain';
import {
  EstablishmentDocument,
  ESTABLISHMENTS_PROJECTION,
} from '../read-model';

export class EstablishmentFinder implements IEstablishmentFinder {
  constructor(
    @InjectModel(ESTABLISHMENTS_PROJECTION)
    public readonly establishments: Model<EstablishmentDocument>
  ) {}

  async findAll(): Promise<EstablishmentDTO[]> {
    const establishments = await this.establishments.find().lean();

    return establishments.map(
      (establishment) => new EstablishmentDTO(establishment)
    );
  }

  async find(id: EstablishmentId): Promise<EstablishmentDTO> {
    const establishment = await this.establishments.findById(id.value).lean();

    if (!establishment) {
      return null;
    }

    return new EstablishmentDTO(establishment);
  }

  async findOneByAlias(alias: Alias): Promise<EstablishmentDTO> {
    const establishment = await this.establishments
      .findOne({ alias: alias.value })
      .lean();

    if (!establishment) {
      return null;
    }

    return new EstablishmentDTO(establishment);
  }

  async findOneByEmail(email: Email): Promise<EstablishmentDTO> {
    const establishment = await this.establishments
      .findOne({ email: email.value })
      .lean();

    if (!establishment) {
      return null;
    }

    return new EstablishmentDTO(establishment);
  }

  async findOneByAddress(
    address: EstablishmentAddress
  ): Promise<EstablishmentDTO> {
    const establishment = await this.establishments
      .findOne({
        address: {
          full: address.full,
          city: address.city,
        },
      })
      .lean();

    if (!establishment) {
      return null;
    }

    return new EstablishmentDTO(establishment);
  }

  async findByGenreId(genreId: GenreId): Promise<EstablishmentDTO[]> {
    const establishments = await this.establishments
      .find({
        genreIds: genreId.value,
      })
      .lean();

    if (!establishments) {
      return;
    }

    return establishments.map(
      (establishment) => new EstablishmentDTO(establishment)
    );
  }
}
