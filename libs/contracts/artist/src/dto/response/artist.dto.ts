import { ApiProperty } from '@nestjs/swagger';

interface Props {
  _id: string;
  userId: string;
  name: string;
  alias: string;
  description: string;
  socialLinks: string[];
  genreIds: string[];
}

export class ArtistDTO {
  constructor(props: Props) {
    Object.assign(this, props);
  }

  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly userId: string;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly alias: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly socialLinks: string[];

  @ApiProperty()
  public readonly genreIds: string[];
}
