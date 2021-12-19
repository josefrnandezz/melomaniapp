import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { Address } from '@melomaniapp/contracts/establishment';

interface Props {
  value: Address;
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

  get value(): Readonly<Address> {
    return this.props.value;
  }

  get full(): string {
    return this.props.value.full;
  }

  get city(): string {
    return this.props.value.city;
  }
}
