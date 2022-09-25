import { Model } from 'mongoose';
import { IEventFinder } from '../../application';
import { EstablishmentId, EventId } from '../../domain';
import { InjectModel } from '@nestjs/mongoose';
import { EVENTS_PROJECTION, EventDocument } from '../read-model';
import { EventDTO, FullEventDTO } from '@melomaniapp/contracts/event';
import { Injectable } from '@nestjs/common';
import { GENRES_PROJECTION, GenreDocument } from '@melomaniapp/nestjs/genre';
import { ARTISTS_PROJECTION, ArtistDocument } from '@melomaniapp/nestjs/artist';

@Injectable()
export class EventFinder implements IEventFinder {
  constructor(
    @InjectModel(EVENTS_PROJECTION)
    private readonly events: Model<EventDocument>,
    @InjectModel(GENRES_PROJECTION)
    private readonly genres: Model<GenreDocument>,
    @InjectModel(ARTISTS_PROJECTION)
    private readonly artists: Model<ArtistDocument>
  ) {}

  async find(id: EventId): Promise<FullEventDTO> {
    const event = await this.events.findById(id.value).lean<EventDTO>();

    if (!event) {
      return null;
    }

    const artistsDocs = await this.artists
      .find({
        _id: {
          $in: event.artistIds,
        },
      })
      .select({ _id: true, name: true, imageUrl: true })
      .sort({ _id: -1 })
      .lean<{ _id: string; name: string; imageUrl: string }[]>();

    const genresDocs = await this.genres
      .find({
        _id: {
          $in: event.genreIds,
        },
      })
      .select({ _id: true, name: true })
      .lean<{ _id: string; name: string }[]>();

    const [artists, genres] = await Promise.all([artistsDocs, genresDocs]);

    return new FullEventDTO({
      event,
      artists,
      genres,
    });
  }

  async findByCity(city: string): Promise<EventDTO[]> {
    return this.events.find({ 'address.city': city }).lean<EventDTO[]>();
  }

  async findByEstablishment(
    establishmentId: EstablishmentId
  ): Promise<EventDTO[]> {
    const events = await this.events
      .find({
        establishmentId: establishmentId.value,
      })
      .lean<EventDTO[]>();

    if (!events) {
      return [];
    }

    return events.map((event) => new EventDTO({ ...event }));
  }
}
