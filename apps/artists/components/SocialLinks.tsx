import {
  souncloudRegex,
  spotifyRegex,
  youtubeRegex,
} from '@melomaniapp/domain';
import { Col, List, Row, Tag } from 'antd';
import Link from 'next/link';

interface LinkProp {
  link: string;
}

const SpotifyTag: React.FC<LinkProp> = ({ link }) => {
  return (
    <Tag color="green">
      <Link href={link}>
        <a target="_blank">Spotify</a>
      </Link>
    </Tag>
  );
};

const SoundCloudTag: React.FC<LinkProp> = ({ link }) => {
  return (
    <Tag color="orange">
      <Link href={link}>
        <a target="_blank">SoundCloud</a>
      </Link>
    </Tag>
  );
};

const YoutubeTag: React.FC<LinkProp> = ({ link }) => {
  return (
    <Tag color="red">
      <Link href={link}>
        <a target="_blank">Youtube</a>
      </Link>
    </Tag>
  );
};

const getTag = (link: string) => {
  if (spotifyRegex.test(link)) {
    return <SpotifyTag link={link} />;
  }

  if (souncloudRegex.test(link)) {
    return <SoundCloudTag link={link} />;
  }

  if (youtubeRegex.test(link)) {
    return <YoutubeTag link={link} />;
  }
};

export const SocialLinks: React.FC<{ links: string[] }> = ({ links }) => {
  return (
    <List>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        {links.map((link) => (
          <List.Item>
            <Col>{getTag(link)}</Col>
          </List.Item>
        ))}
      </Row>
    </List>
  );
};
