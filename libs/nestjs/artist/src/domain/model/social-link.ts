import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import {
  souncloudRegex,
  spotifyRegex,
  youtubeRegex,
} from '@melomaniapp/domain';

interface Props {
  value: string;
}

export class SocialLink extends ValueObject<Props> {
  public static fromString(link: string): SocialLink {
    if (link.length === 0) {
      throw DomainError.because('Social link cannot be empty');
    }

    SocialLink.validateSupportedSocialLinks(link);

    return new SocialLink({ value: link });
  }

  private static validateSupportedSocialLinks(link: string) {
    if (
      !(
        spotifyRegex.test(link) ||
        youtubeRegex.test(link) ||
        souncloudRegex.test(link)
      )
    ) {
      throw DomainError.because(`Invalid social link ${link}`);
    }
  }

  get value(): string {
    return this.props.value;
  }
}
