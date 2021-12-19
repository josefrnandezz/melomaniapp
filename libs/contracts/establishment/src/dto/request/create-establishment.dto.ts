import { ApiProperty } from '@nestjs/swagger';

import { Address } from '..';

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
  address: Address;

  @ApiProperty()
  genreIds: string[];
}
