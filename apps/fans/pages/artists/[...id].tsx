import { useArtist, useGenres, useUser } from '@melomaniapp/hooks';

import { Card, Col, Divider, List, Row, Spin, Tag, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';
import { ProfileHeader } from '../../components/ProfileHeader';

import { GenreList } from '@melomaniapp/ui';
import Link from 'next/link';
import { FollowType } from '@melomaniapp/contracts/follow';

import {
  souncloudRegex,
  spotifyRegex,
  youtubeRegex,
} from '@melomaniapp/domain';

const SpotifyTag: React.FC<{ link: string }> = ({ link }) => {
  return (
    <Tag color="green">
      <Link href={link}>
        <a target="_blank">Spotify</a>
      </Link>
    </Tag>
  );
};

const SoundCloudTag: React.FC<{ link: string }> = ({ link }) => {
  return (
    <Tag color="orange">
      <Link href={link}>
        <a target="_blank">SoundCloud</a>
      </Link>
    </Tag>
  );
};

const YoutubeTag: React.FC<{ link: string }> = ({ link }) => {
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

const SocialLinks: React.FC<{ links: string[] }> = ({ links }) => {
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

export const ArtistPage = () => {
  const [session] = useSession();
  const router = useRouter();

  const { id } = router.query;

  const { data: artist, isLoading } = useArtist(id as string);
  const genres = useGenres();

  const { data: user } = useUser(session);

  if (isLoading || genres?.isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const followRoute = `users/${user?._id}/follows_to/artists/${artist?._id}`;

  const unfollowRoute = `users/${user?._id}/unfollows_to/artists/${artist?._id}`;

  return (
    <Layout session={session}>
      <Row
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          marginBottom: '140px',
          marginTop: '100px',
        }}
        justify="center"
      >
        <Col span={12} style={{ margin: 'auto' }}>
          <ProfileHeader
            type={FollowType.Artist}
            id={artist?._id}
            name={artist?.name}
            alias={artist?.alias}
            followRoute={followRoute}
            unfollowRoute={unfollowRoute}
            session={session}
          />
        </Col>
        <Col span={10} offset={2} style={{ margin: 'auto' }}>
          <Card style={{ background: '#fffafa', borderRadius: '20px' }}>
            <Typography.Title level={4}>Descripción</Typography.Title>
            <Typography.Paragraph>{artist?.description}</Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>Géneros</Typography.Title>
            <GenreList
              genres={genres.data?.filter((genre) =>
                artist?.genreIds.includes(genre._id)
              )}
            />
            {artist?.socialLinks ? (
              <>
                <Divider />
                <Typography.Title level={4}>
                  Enlaces de interés
                </Typography.Title>
                <SocialLinks links={artist.socialLinks} />
              </>
            ) : null}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default ArtistPage;
