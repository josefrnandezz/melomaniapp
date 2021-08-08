import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class Username extends ValueObject<Props> {
  public static fromString(name: string): Username {
    if (name.length === 0) {
      throw DomainError.because('Username cannot be empty');
    }

    if (!/^[a-zA-Z0-9ñÑ]+$/.test(name)) {
      throw DomainError.because('Invalid username characters');
    }

    return new Username({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
