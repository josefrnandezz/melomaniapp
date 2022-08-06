import { InjectModel } from '@nestjs/mongoose';
import { FOLLOWS_PROJECTION, FollowDocument } from '../read-model';
import { IFollowFinder } from '../../application/services/follow-finder.interface';
import { FollowedToId, FollowId } from '../../domain';
import { Model } from 'mongoose';
import { FollowDTO } from '@melomaniapp/contracts/follow';
import { FollowedFromId } from '../../domain/model/followed-from-id';

export class FollowFinder implements IFollowFinder {
  constructor(
    @InjectModel(FOLLOWS_PROJECTION)
    private readonly follows: Model<FollowDocument>
  ) {}

  async find(id: FollowId): Promise<FollowDTO | null> {
    const follow = await this.follows.findById(id.value);

    if (!follow) {
      return null;
    }

    return new FollowDTO({ ...follow });
  }
}
