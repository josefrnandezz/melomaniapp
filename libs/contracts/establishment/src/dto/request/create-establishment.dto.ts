import { AddressProps } from '@melomaniapp/nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEstablishmentDTO {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  alias: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ example: { full: 'string', city: 'string' } })
  address: AddressProps;

  @ApiProperty()
  genreIds: string[];
}
