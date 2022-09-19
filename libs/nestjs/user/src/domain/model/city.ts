import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class City extends ValueObject<Props> {
  public static fromString(city: string): City {
    if (city.length === 0) {
      throw DomainError.because('City cannot be empty');
    }

    if (!/^[a-zA-Z\u00C0-\u024F\s\/]+$/.test(city)) {
      throw DomainError.because('Invalid city characters');
    }

    return new City({ value: city });
  }

  get value(): string {
    return this.props.value;
  }
}
