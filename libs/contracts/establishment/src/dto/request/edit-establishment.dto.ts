import { AddressProps } from '@melomaniapp/nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

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
  address?: AddressProps;

  @ApiProperty()
  genreIds?: string[];
}
