import { ApiProperty } from '@nestjs/swagger';

interface Props {
  _id: string;
  name: string;
}

export class GenreDTO {
  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly name: string;

  constructor(props: Props) {
    Object.assign(this, props);
  }
}
