import { ApiProperty } from '@nestjs/swagger';

export class EditGenreDTO {
  @ApiProperty()
  name: string;
}
