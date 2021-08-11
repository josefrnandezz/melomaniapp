import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class GenreName extends ValueObject<Props> {
  public static fromString(name: string): GenreName {
    if (name.length === 0) {
      throw DomainError.because('Genre name cannot be empty');
    }

    if (!/^[a-z0-9ñ&\s]+$/.test(name)) {
      throw DomainError.because('Invalid genre name characters');
    }

    return new GenreName({ value: name.toLowerCase() });
  }

  get value(): string {
    return this.props.value;
  }
}
