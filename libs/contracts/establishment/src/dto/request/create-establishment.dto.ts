import { ApiProperty } from '@nestjs/swagger';

import { Address } from '..';

export class CreateEstablishmentDTO {
  @ApiProperty()
  public readonly _id: string;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly slug: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly address: Address;

  @ApiProperty()
  public readonly genreIds: string[];
}
