import { AddressProps } from '@melomaniapp/nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  artistIds: string[];

  @ApiProperty()
  startsAt: Date;

  @ApiProperty()
  endsAt: Date;

  @ApiProperty()
  establishmentId: string;

  @ApiProperty()
  genreIds: string[];

  @ApiProperty({ example: { full: 'string', city: 'string' } })
  address: AddressProps;
}
