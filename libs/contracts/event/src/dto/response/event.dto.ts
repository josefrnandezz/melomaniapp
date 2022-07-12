import { AddressProps } from '@melomaniapp/nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

interface Props {
  _id: string;
  name: string;
  description: string;
  startsAt: Date;
  endsAt: Date;
  artistIds: string[];
  establishmentId: string;
  genreIds: string[];
  address: AddressProps;
}

export class EventDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly startsAt: Date;

  @ApiProperty()
  public readonly endsAt: Date;

  @ApiProperty()
  public readonly artistIds: string[];

  @ApiProperty()
  public readonly establishmentId: string;

  @ApiProperty()
  public readonly genreIds: string[];

  @ApiProperty({ example: { full: 'string', city: 'string' } })
  public readonly address: AddressProps;
}
