import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { UserId } from '@melomaniapp/nestjs/user';
import { ArtistId } from '@melomaniapp/nestjs/artist';
import { FollowType } from './follow-type.';
import { FollowedFromId } from './followed-from-id';

interface Props {
  id: string;
  type: number;
}

type FromId = UserId | ArtistId;

export class FollowedFrom extends ValueObject<Props> {
  constructor(
    public readonly _id: FollowedFromId,
    public readonly _type: FollowType
  ) {
    super({ id: _id.value, type: _type });
  }

  public static with(fromId: FromId, type: FollowType): FollowedFrom {
    const id = FollowedFromId.fromString(fromId.value);

    return new FollowedFrom(id, type);
  }

  public get id(): string {
    return this._id.value;
  }

  public get type(): number {
    return this._type;
  }
}
