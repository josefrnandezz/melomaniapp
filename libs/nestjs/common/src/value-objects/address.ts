import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export interface AddressProps {
  full: string;
  city: string;
}

interface Props {
  value: AddressProps;
}

export class Address extends ValueObject<Props> {
  public static with(full: string, city: string) {
    if (city.length === 0 || full.length === 0) {
      throw DomainError.because("There can't be empty fields");
    }

    return new Address({
      value: { full, city },
    });
  }

  get value(): Readonly<AddressProps> {
    return this.props.value;
  }

  get full(): string {
    return this.props.value.full;
  }

  get city(): string {
    return this.props.value.city;
  }
}
