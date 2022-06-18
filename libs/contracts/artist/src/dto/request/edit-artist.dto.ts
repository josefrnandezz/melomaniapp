import { ApiProperty } from '@nestjs/swagger';

export class EditArtistDTO {
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
