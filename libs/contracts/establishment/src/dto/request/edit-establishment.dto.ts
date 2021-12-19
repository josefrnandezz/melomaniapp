import { ApiProperty } from '@nestjs/swagger';

import { Address } from '..';

export class EditEstablishmentDTO {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  alias?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  address?: Address;

  @ApiProperty()
  genres?: string[];
}
