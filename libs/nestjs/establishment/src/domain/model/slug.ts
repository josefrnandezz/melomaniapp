import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class Slug extends ValueObject<Props> {
  public static fromString(slug: string): Slug {
    if (slug.length === 0) {
      throw DomainError.because('Establishment slug cannot be empty');
    }

    if (!/^[a-z0-9_.]+$/.test(slug)) {
      throw DomainError.because('Invalid establishment slug characters');
    }

    return new Slug({ value: slug });
  }

  get value(): string {
    return this.props.value;
  }
}
