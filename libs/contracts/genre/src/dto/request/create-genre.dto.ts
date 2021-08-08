import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDTO {
  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly name: string;
}
