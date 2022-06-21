import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

export class Email extends ValueObject<Props> {
  private static validateEmail(email: string): boolean {
    // const re =
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(email.toLowerCase());
    return true;
  }

  public static fromString(email: string) {
    if (email.length === 0) {
      throw DomainError.because('Email cannot be empty');
    }

    if (!this.validateEmail(email)) {
      throw DomainError.because('Invalid email');
    }

    return new Email({ value: email });
  }

  get value(): string {
    return this.props.value;
  }
}
