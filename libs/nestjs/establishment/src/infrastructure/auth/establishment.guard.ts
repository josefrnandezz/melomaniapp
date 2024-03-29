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

import { GetEstablishmentQuery } from '../../application';
import { EstablishmentDocument } from '../read-model';

@Injectable()
export class EstablishmentGuard extends AuthGuard('jwt') {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { id } = req?.params;

    if (id) {
      req.establishment = await this.queryBus.execute(
        new GetEstablishmentQuery(id)
      );
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

    const establishment: EstablishmentDocument = context
      .switchToHttp()
      .getRequest().establishment;

    if (establishment && establishment.ownerId === user?._id) {
      user?.roles.push(Role.EstablishmentOwner);
    }

    return user;
  }
}
