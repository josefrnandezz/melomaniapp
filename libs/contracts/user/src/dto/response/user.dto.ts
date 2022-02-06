import { Role } from '@melomaniapp/nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

interface Props {
  _id: string;
  username: string;
  roles: Role[];
  email: string;
}

export class UserDto {
  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly username: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly city: string;

  @ApiProperty()
  public readonly genres: string[];

  @ApiProperty()
  public readonly roles: Role[];

  constructor(props: Partial<Props>) {
    Object.assign(this, props);
  }
}
