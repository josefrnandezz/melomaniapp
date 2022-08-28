import { Role } from '@melomaniapp/nestjs/common';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';

import { GetUserByUsernameQuery } from '../../application';
import { UserDocument } from '../read-model';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(UserGuard.name);

  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { username } = req?.query;

    if (username) {
      req.user = await this.queryBus.execute(
        new GetUserByUsernameQuery(username)
      );
    }

    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const document: UserDocument = context.switchToHttp().getRequest().user;

    if (document && document._id === user?._id) {
      user?.roles.push(Role.UserOwner);
    }

    return user;
  }
}
