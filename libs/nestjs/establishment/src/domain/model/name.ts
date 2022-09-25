import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class Name extends ValueObject<Props> {
  public static fromString(name: string): Name {
    if (name.length === 0) {
      throw DomainError.because('Establishment name cannot be empty');
    }

    return new Name({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
