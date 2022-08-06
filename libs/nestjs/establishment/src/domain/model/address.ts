import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { AddressProps } from '@melomaniapp/nestjs/common';

interface Props {
  value: AddressProps;
}

export class EstablishmentAddress extends ValueObject<Props> {
  public static with(full: string, city: string) {
    if (city.length === 0 || full.length === 0) {
      throw DomainError.because("There can't be empty fields");
    }

    return new EstablishmentAddress({
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
