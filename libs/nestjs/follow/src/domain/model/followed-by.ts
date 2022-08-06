import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { UserId } from '@melomaniapp/nestjs/user';
import { ArtistId } from '@melomaniapp/nestjs/artist';
import { FollowedById } from './followed-by-id';
import { FollowType } from '@melomaniapp/contracts/follow';

interface Props {
  id: string;
  type: number;
}

type ById = UserId | ArtistId;

export class FollowedBy extends ValueObject<Props> {
  constructor(
    public readonly _id: FollowedById,
    public readonly _type: FollowType
  ) {
    super({ id: _id.value, type: _type });
  }

  public static with(byId: ById, type: FollowType): FollowedBy {
    const id = FollowedById.fromString(byId.value);

    return new FollowedBy(id, type);
  }

  public get id(): string {
    return this._id.value;
  }

  public get type(): number {
    return this._type;
  }
}
