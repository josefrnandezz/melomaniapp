import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class Description extends ValueObject<Props> {
  public static fromString(description: string): Description {
    if (description.length === 0) {
      throw DomainError.because('Establishment description cannot be empty');
    }

    if (description.length > 200) {
      throw DomainError.because(
        'Establishment description length cannot be larger than 200 characters'
      );
    }

    if (!/^[a-zA-Z0-9ñÑ\s]+$/.test(description)) {
      throw DomainError.because('Invalid establishment name characters');
    }

    return new Description({ value: description });
  }

  get value(): string {
    return this.props.value;
  }
}
