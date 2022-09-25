import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class ArtistName extends ValueObject<Props> {
  public static fromString(name: string): ArtistName {
    if (name.length === 0) {
      throw DomainError.because('Artist name cannot be empty');
    }

    return new ArtistName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
