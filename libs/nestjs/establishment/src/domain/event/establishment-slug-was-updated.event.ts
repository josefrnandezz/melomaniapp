import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type EstablishmentSlugWasUpdatedProps = {
  slug: string;
};

export class EstablishmentSlugWasUpdated extends Event<EstablishmentSlugWasUpdatedProps> {
  constructor(public readonly id: string, public readonly slug: string) {
    super(id, { slug });
  }
}
