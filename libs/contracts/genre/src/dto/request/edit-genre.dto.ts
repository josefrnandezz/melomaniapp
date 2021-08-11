import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditGenreDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
