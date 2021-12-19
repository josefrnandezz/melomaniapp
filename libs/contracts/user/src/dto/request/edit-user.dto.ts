import { Role } from '@melomaniapp/nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  genres: string[];

  @ApiProperty()
  roles: Role[];
}
