import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { GenreId } from '@melomaniapp/nestjs/genre';
import { FollowType } from './follow-type.';
import { FollowedToId } from './followed-to-id';
import { EventId } from '@melomaniapp/nestjs/event';
import { EstablishmentId } from '@melomaniapp/nestjs/establishment';
import { ArtistId } from '@melomaniapp/nestjs/artist';

interface Props {
  id: string;
  type: number;
}

type ToId = GenreId | ArtistId | EstablishmentId | EventId;

export class FollowedTo extends ValueObject<Props> {
  constructor(
    public readonly _id: FollowedToId,
    public readonly _type: FollowType
  ) {
    super({ id: _id.value, type: _type });
  }

  public static with(toId: ToId, type: FollowType): FollowedTo {
    const id = FollowedToId.fromString(toId.value);

    return new FollowedTo(id, type);
  }

  public get id(): string {
    return this._id.value;
  }

  public get type(): number {
    return this._type;
  }
}
