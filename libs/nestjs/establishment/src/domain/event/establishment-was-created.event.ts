import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import {
  Address,
  CreateEstablishmentDTO,
} from '@melomaniapp/contracts/establishment';

export class EstablishmentWasCreated extends Event<CreateEstablishmentDTO> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly email: string,
    public readonly address: Address,
    public readonly genreIds: string[]
  ) {
    super(id, {
      _id: id,
      name,
      slug,
      description,
      email,
      address: address,
      genreIds,
    });
  }
}
