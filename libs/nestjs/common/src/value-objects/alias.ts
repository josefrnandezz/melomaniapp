import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class Alias extends ValueObject<Props> {
  public static fromString(alias: string): Alias {
    if (alias.length === 0) {
      throw DomainError.because('Alias cannot be empty');
    }

    if (!/^[a-z0-9_.]+$/.test(alias)) {
      throw DomainError.because('Invalid alias characters');
    }

    return new Alias({ value: alias });
  }

  get value(): string {
    return this.props.value;
  }
}
