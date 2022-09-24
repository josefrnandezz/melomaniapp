import { AddressProps } from '@melomaniapp/nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

interface EventProps {
  _id: string;
  userId: string;
  name: string;
  description: string;
  startsAt: Date;
  endsAt: Date;
  address: AddressProps;
  establishmentId: string;
}

interface ArtistProps {
  _id: string;
  name: string;
  imageUrl: string;
}

interface GenreProps {
  _id: string;
  name: string;
}

interface Props {
  event: EventProps;
  artists: ArtistProps[];
  genres: GenreProps[];
}

export class FullEventDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  @ApiProperty()
  public readonly event: EventProps;

  @ApiProperty()
  public readonly artists: ArtistProps[];

  @ApiProperty()
  public readonly genres: GenreProps[];
}
