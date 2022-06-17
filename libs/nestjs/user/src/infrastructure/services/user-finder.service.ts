import { UserDto } from '@melomaniapp/contracts/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserFinder } from '../../application';
import { Email, UserId, Username } from '../../domain';
import { UserDocument, USERS_PROJECTION } from '../read-model';

@Injectable()
export class UserFinder implements IUserFinder {
  constructor(
    @InjectModel(USERS_PROJECTION)
    private readonly users: Model<UserDocument>
  ) {}
  async findAll(): Promise<UserDto[]> {
    const users = await this.users.find().lean();

    return users.map((user) => new UserDto(user));
  }

  async find(id: UserId): Promise<UserDto> {
    const user = await this.users.findById(id.value).lean();

    return new UserDto(user);
  }

  async findOneByUsername(username: Username): Promise<UserDto> {
    return this.users.findOne({ username: username.value }).lean();
  }

  async findOneByEmail(email: Email): Promise<UserDto> {
    return this.users.findOne({ email: email.value }).lean();
  }
}
