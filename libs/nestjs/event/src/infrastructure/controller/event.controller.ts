import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventService } from '../services';
import { ACGuard, UseRoles } from 'nest-access-control';
import { catchError, Resource, User } from '@melomaniapp/nestjs/common';
import { CreateEventDTO, EventDTO } from '@melomaniapp/contracts/event';
import { UserDto } from '@melomaniapp/contracts/user';
import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import { EventGuard } from '../auth';

@ApiBearerAuth()
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseRoles({
    resource: Resource.Event,
    action: 'create',
    possession: 'any',
  })
  @UseGuards(EventGuard, ACGuard)
  async create(
    @User() user: UserDto,
    @Body() eventDTO: CreateEventDTO
  ): Promise<EventDTO> {
    try {
      return await this.eventService.create(user._id, eventDTO);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }
}
