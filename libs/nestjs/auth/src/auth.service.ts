import {
  AccessTokenInterface,
  JwtPayloadInterface,
} from '@melomaniapp/contracts/auth';
import { UserDto } from '@melomaniapp/contracts/user';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { GetUserByUsernameQuery } from '@melomaniapp/nestjs/user';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private jwtService: JwtService
  ) {}

  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hashSync(password, salt);
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    try {
      const user = await this.queryBus.execute<GetUserByUsernameQuery, UserDto>(
        new GetUserByUsernameQuery(username)
      );

      return user && (await bcrypt.compareSync(password, user.password));
    } catch (e) {
      this.logger.error(`Access error with username ${username}: ${e.message}`);

      return false;
    }
  }

  async generateAccessToken(username: string): Promise<AccessTokenInterface> {
    const user = await this.queryBus.execute<GetUserByUsernameQuery, UserDto>(
      new GetUserByUsernameQuery(username)
    );

    const payload: JwtPayloadInterface = {
      username: user.username,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: 'HS512',
      }),
    };
  }
}
