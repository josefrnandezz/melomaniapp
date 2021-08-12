import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { Address } from '@melomaniapp/contracts/establishment';

interface Props {
  value: Address;
}

export class EstablishmentAddress extends ValueObject<Props> {
  public static with(
    street: string,
    number: number,
    postalCode: string,
    city: string,
    country: string
  ) {
    if (
      street.length === 0 ||
      city.length === 0 ||
      postalCode.length === 0 ||
      country.length === 0
    ) {
      throw DomainError.because("There can't be empty fields");
    }

    if (number === 0) {
      throw DomainError.because('The number cannot be zero');
    }

    if (/^[0-9A-Z\s]+$/.test(postalCode)) {
      throw DomainError.because('Invalid postal code');
    }

    return new EstablishmentAddress({
      value: { street, number, postalCode, city, country },
    });
  }

  get street(): string {
    return this.props.value.street;
  }

  get number(): number {
    return this.props.value.number;
  }

  get postalCode(): string {
    return this.props.value.postalCode;
  }

  get city(): string {
    return this.props.value.city;
  }

  get country(): string {
    return this.props.value.country;
  }

  get value(): Address {
    return this.props.value;
  }
}
