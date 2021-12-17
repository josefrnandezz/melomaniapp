import { UserDto } from '@melomaniapp/contracts/user';
import { UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const ID = '78dbd5bd-86c1-4925-a08c-1d0170e4851d';
const USERNAME = 'username';
const PASSWORD = 'password';
const CRYPT_PASSWORD =
  '$2a$04$J.qvJcqZRPBlGFKWIxPOYOsPRXpkZmTyTHScEF3Kq5/QXV.8oMcfy';

describe('AuthController', () => {
  let controller: AuthController;
  let user: UserDto;
  const queryBus: Partial<QueryBus> = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [
        AuthService,
        {
          provide: QueryBus,
          useValue: queryBus,
        },
      ],
    }).compile();
    app.useLogger(false);

    user = {
      _id: ID,
      username: USERNAME,
      password: CRYPT_PASSWORD,
      roles: [],
    };
    controller = app.get<AuthController>(AuthController);
    queryBus.execute = jest.fn().mockResolvedValue(user);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login valid user', async () => {
    expect(
      await controller.login({ username: USERNAME, password: PASSWORD })
    ).toHaveProperty('access_token');
  });

  it('should not login invalid password', () => {
    expect(
      controller.login({ username: USERNAME, password: 'wrong password' })
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should not login invalid user', () => {
    queryBus.execute = jest.fn().mockResolvedValue(null);

    expect(
      controller.login({ username: USERNAME, password: PASSWORD })
    ).rejects.toThrow(UnauthorizedException);
  });
});
