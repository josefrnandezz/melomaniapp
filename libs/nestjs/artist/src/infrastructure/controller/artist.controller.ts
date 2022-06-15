import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistDTO, CreateArtistDTO } from '@melomaniapp/contracts/artist';
import { UserDto } from '@melomaniapp/contracts/user';
import { catchError, User } from '@melomaniapp/nestjs/common';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ArtistService } from '../services';

@ApiBearerAuth()
@Controller('artists')
export class ArtistController {
  constructor(public readonly artistService: ArtistService) {}

  @Post()
  async create(
    @User() user: UserDto,
    @Body() artistDTO: CreateArtistDTO
  ): Promise<ArtistDTO> {
    try {
      return await this.artistService.create(user._id, artistDTO);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }
}
