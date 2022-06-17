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

import { GetArtistQuery } from '../../application';
import { ArtistDocument } from '../read-model';

@Injectable()
export class ArtistGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(ArtistGuard.name);

  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { id } = req?.params;

    if (id) {
      req.artist = await this.queryBus.execute(new GetArtistQuery(id));
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

    const artist: ArtistDocument = context.switchToHttp().getRequest().artist;

    if (artist && artist.userId === user?._id) {
      user?.roles.push(Role.ArtistOwner);
    }

    return user;
  }
}
