import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@melomaniapp/nestjs/common';

export class EditUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roles: Role[];
}
