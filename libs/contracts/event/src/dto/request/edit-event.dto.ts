import { ApiProperty } from '@nestjs/swagger';

export class EditEventDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startsAt: Date;

  @ApiProperty()
  endsAt: Date;

  @ApiProperty()
  artistIds: string[];

  @ApiProperty()
  genreIds: string[];
}
