import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDTO {
  @ApiProperty()
  public readonly _id: string;

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
