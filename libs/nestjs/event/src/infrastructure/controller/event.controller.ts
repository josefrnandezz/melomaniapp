import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventService } from '../services';
import { ACGuard } from 'nest-access-control';
import { catchError, User } from '@melomaniapp/nestjs/common';
import {
  CreateEventDTO,
  EditEventDTO,
  EventDTO,
  FullEventDTO,
} from '@melomaniapp/contracts/event';
import { UserDto } from '@melomaniapp/contracts/user';
import { IdAlreadyRegisteredError } from '@aulasoftwarelibre/nestjs-eventstore';
import { EventGuard } from '../auth';
import * as uuid from 'uuid';

@ApiBearerAuth()
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(EventGuard, ACGuard)
  async create(
    @User() user: UserDto,
    @Body() eventDTO: CreateEventDTO
  ): Promise<EventDTO> {
    try {
      return await this.eventService.create(user._id, {
        _id: uuid.v4(),
        ...eventDTO,
      });
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FullEventDTO> {
    try {
      return await this.eventService.findOne(id);
    } catch (e) {
      throw catchError(e);
    }
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() eventDTO: EditEventDTO
  ): Promise<void> {
    try {
      await this.eventService.update(id, eventDTO);
    } catch (e) {
      throw catchError(e);
    }
  }

  @Delete(':id')
  async cancel(@Param('id') id: string): Promise<void> {
    try {
      return await this.eventService.cancel(id);
    } catch (e) {
      throw catchError(e);
    }
  }
}
