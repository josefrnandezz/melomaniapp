import { JwtPayloadInterface } from '@melomaniapp/contracts/auth';
import { UserDto } from '@melomaniapp/contracts/user';
import { Role } from '@melomaniapp/nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  CreateUserCommand,
  GetUserByUsernameQuery,
} from '@melomaniapp/nestjs/user';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as uuid from 'uuid';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'changeme',
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserDto> {
    let user: UserDto;

    try {
      user = await this.queryBus.execute<GetUserByUsernameQuery, UserDto>(
        new GetUserByUsernameQuery(payload.sub)
      );
    } catch (error) {
      const userId = uuid.v4();

      await this.commandBus.execute(
        new CreateUserCommand(userId, payload.sub, payload.email, [Role.User])
      );

      user = new UserDto({
        _id: userId,
        username: payload.sub,
        email: payload.email,
        roles: [Role.User],
      });
    }

    return user;
  }
}
