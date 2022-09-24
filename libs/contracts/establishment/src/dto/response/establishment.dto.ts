import { ApiProperty } from '@nestjs/swagger';
import { AddressProps } from '@melomaniapp/nestjs/common';

interface Props {
  _id: string;
  ownerId: string;
  name: string;
  alias: string;
  description: string;
  email: string;
  address: AddressProps;
  genreIds: string[];
  imageUrl: string;
}

export class EstablishmentDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly ownerId: string;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly alias: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty({ example: { full: 'string', city: 'string' } })
  public readonly address: AddressProps;

  @ApiProperty()
  public readonly genreIds: string[];

  @ApiProperty()
  public readonly imageUrl: string;
}
