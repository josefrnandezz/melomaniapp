import { FollowType } from '@melomaniapp/contracts/follow';
import { IQuery } from '@nestjs/cqrs';

export class GetUserFollowsQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly type: FollowType
  ) {}
}
