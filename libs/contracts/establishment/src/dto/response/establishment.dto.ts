import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { Address } from '..';

interface Props {
  _id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  email: string;
  address: Address;
  genreIds: string[];
}

export class EstablishmentDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  @Exclude()
  public readonly ownerId: string;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly slug: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty({ example: { full: 'string', city: 'string' } })
  public readonly address: Address;

  @ApiProperty()
  public readonly genreIds: string[];
}
