import { DomainError, ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

interface Props {
  value: string;
}

const spotifyRegex = /https:\/\/(www\.)?open\.spotify\.com\/artist\/.*/;
const youtubeRegex = /https:\/\/(www\.)?youtube\.com\/c\/.*/;
const souncloudRegex = /https:\/\/(www\.)?soundcloud\.com\/.*/;

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
      !spotifyRegex.test(link) &&
      !youtubeRegex.test(link) &&
      !souncloudRegex.test(link)
    ) {
      throw DomainError.because('Invalid social link');
    }
  }

  get value(): string {
    return this.props.value;
  }
}
