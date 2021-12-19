import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import {
  Address,
  CreateEstablishmentDTO,
} from '@melomaniapp/contracts/establishment';

export interface EstablishmentWasCreatedProps extends CreateEstablishmentDTO {
  ownerId: string;
}

export class EstablishmentWasCreated extends Event<EstablishmentWasCreatedProps> {
  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly name: string,
    public readonly alias: string,
    public readonly description: string,
    public readonly email: string,
    public readonly address: Address
  ) {
    super(id, {
      _id: id,
      ownerId,
      name,
      alias,
      description,
      email,
      address: address,
      genreIds: [],
    });
  }
}
