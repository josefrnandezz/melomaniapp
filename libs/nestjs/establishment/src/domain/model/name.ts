import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class Name extends ValueObject<Props> {
  public static fromString(name: string): Name {
    if (name.length === 0) {
      throw DomainError.because('Establishment name cannot be empty');
    }

    if (!/^[a-zA-Z0-9ñÑ\s]+$/.test(name)) {
      throw DomainError.because('Invalid establishment name characters');
    }

    return new Name({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
