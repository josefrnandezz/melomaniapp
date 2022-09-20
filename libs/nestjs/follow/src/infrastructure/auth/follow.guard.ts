import { anonymousUser } from '@melomaniapp/contracts/user';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FollowGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err) {
      throw err || new UnauthorizedException();
    }

    if (!user) {
      return anonymousUser();
    }

    return user;
  }
}
