import {
  CreateUserDto,
  EditUserDto,
  UserDto,
} from '@melomaniapp/contracts/user';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateUserCommand,
  DeleteUserCommand,
  GetUserByUsernameQuery,
  GetUserQuery,
  GetUsersQuery,
  UpdateUserCommand,
} from '../../application';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async findOne(id: string): Promise<UserDto> {
    return this.queryBus.execute(new GetUserByUsernameQuery(id));
  }

  async findAll(): Promise<UserDto[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    await this.commandBus.execute(
      new CreateUserCommand(
        userDto._id,
        userDto.username,
        userDto.email,
        userDto.roles
      )
    );

    return new UserDto({ ...userDto });
  }

  async update(id: string, editUserDto: EditUserDto): Promise<UserDto> {
    await this.commandBus.execute(
      new UpdateUserCommand(
        id,
        editUserDto.username,
        editUserDto.city,
        editUserDto.genres,
        editUserDto.roles
      )
    );

    const user = await this.queryBus.execute(new GetUserQuery(id));

    return new UserDto({ ...user });
  }

  async delete(id: string) {
    await this.commandBus.execute(new DeleteUserCommand(id));
  }
}
