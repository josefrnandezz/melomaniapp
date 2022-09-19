import { Role } from '@melomaniapp/nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  genres: string[];

  @ApiProperty()
  roles: Role[];
}
