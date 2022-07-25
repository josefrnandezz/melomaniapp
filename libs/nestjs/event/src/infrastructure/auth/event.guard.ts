import { anonymousUser } from '@melomaniapp/contracts/user';
import { Role } from '@melomaniapp/nestjs/common';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { GetEventQuery } from '../../application';

import { EventDocument } from '../read-model';

@Injectable()
export class EventGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(EventGuard.name);

  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { id } = req?.params;

    if (id) {
      req.event = await this.queryBus.execute(new GetEventQuery(id));
    }

    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err) {
      throw err || new UnauthorizedException();
    }

    if (!user) {
      return anonymousUser();
    }

    const event: EventDocument = context.switchToHttp().getRequest().artist;

    if (event && event.userId === user?._id) {
      user?.roles.push(Role.EventOwner);
    }

    return user;
  }
}
