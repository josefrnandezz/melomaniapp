import {
  IdAlreadyRegisteredError,
  IdNotFoundError,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import {
  CreateUserDto,
  EditUserDto,
  UserDto,
} from '@melomaniapp/contracts/user';
import { catchError, Role, Roles, User } from '@melomaniapp/nestjs/common';
import { MailService } from '@melomaniapp/nestjs/mailer';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ACGuard } from 'nest-access-control';

import { UserGuard } from '../auth';
import { UserService } from '../services';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      return this.userService.create(userDto);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Get()
  @Roles(Role.Admin)
  async findAll(@Res({ passthrough: true }) res: Response): Promise<UserDto[]> {
    try {
      const users = await this.userService.findAll();
      const length = users.length;

      res.setHeader('X-Total-Count', length);

      return users;
    } catch (e) {
      throw catchError(e);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: EditUserDto) {
    try {
      return await this.userService.update(id, userDto);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'Delete user' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(204)
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return this.userService.delete(id);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Get('me')
  @UseGuards(UserGuard, ACGuard)
  async getMyUser(@User() user: UserDto): Promise<UserDto> {
    try {
      await this.mailService.sendUserConfirmation(user, 'token');
      return this.userService.findOneById(user._id);
    } catch (error) {
      throw catchError(error);
    }
  }

  @Get('me/establishment')
  @UseGuards(UserGuard, ACGuard)
  async getUserEstablishent(@User() user: UserDto): Promise<EstablishmentDTO> {
    try {
      return this.userService.getUserEstablishment(user._id);
    } catch (error) {
      throw catchError(error);
    }
  }

  @Get('me/artist')
  @UseGuards(UserGuard, ACGuard)
  async getUserArtist(@User() user: UserDto): Promise<ArtistDTO> {
    try {
      return this.userService.getUserArtist(user._id);
    } catch (error) {
      throw catchError(error);
    }
  }
}
