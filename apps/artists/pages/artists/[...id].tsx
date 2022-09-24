import {
  useArtist,
  useArtistFollows,
  useGenres,
  useMyArtist,
} from '@melomaniapp/hooks';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row, Space, Spin, Typography } from 'antd';
import {
  capitalizeFirstLetter,
  FollowButton,
  GenreList,
} from '@melomaniapp/ui';
import { useRouter } from 'next/router';
import { SocialLinks } from '../../components/SocialLinks';
import { FollowType } from '@melomaniapp/contracts/follow';
import { useSession } from 'next-auth/client';

export const ArtistPage = () => {
  const [session] = useSession();
  const router = useRouter();
  const genres = useGenres();

  const id = router.query.id as string;

  const { data: myArtist } = useMyArtist(session);
  const follows = useArtistFollows(FollowType.Artist, session);
  const artist = useArtist(id);

  if (follows?.isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  if (artist?.isLoading || genres?.isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const follow = follows.data?.find(
    (follow) => follow.followedToId === artist.data?._id
  );

  const createFollow = () =>
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/follows/artists/${myArtist?._id}/follows_to/artists/${
        artist.data?._id
      }`,
      {
        method: 'Post',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

  const deleteFollow = () =>
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/follows/${follow?._id}/artists/${
        myArtist?._id
      }/unfollows_to/artists/${artist.data?._id}`,
      {
        method: 'Put',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

  return (
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
        <Card
          bordered={false}
          style={{
            margin: 'auto',
            background: '#fffafa',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: '20px',
          }}
        >
          <Space direction="vertical" size="middle">
            <div style={{ margin: 'auto', alignItems: 'center' }}>
              <Avatar size={140} icon={<UserOutlined />} />
            </div>
            <Typography.Title>
              {artist.data?.name && capitalizeFirstLetter(artist.data?.name)}
            </Typography.Title>

            <Typography.Paragraph>{`@${artist.data?.alias}`}</Typography.Paragraph>

            <FollowButton
              isActive={!!follow}
              createFollow={createFollow}
              deleteFollow={deleteFollow}
            />
          </Space>
        </Card>
      </Col>
      <Col span={10} offset={2} style={{ margin: 'auto' }}>
        <Card style={{ background: '#fffafa', borderRadius: '20px' }}>
          <Typography.Title level={4}>Descripción</Typography.Title>
          <Typography.Paragraph>
            {artist.data?.description}
          </Typography.Paragraph>
          <Divider />
          <Typography.Title level={4}>Géneros</Typography.Title>
          <GenreList
            genres={genres.data?.filter((genre) =>
              artist.data?.genreIds.includes(genre._id)
            )}
          />
          {artist.data?.socialLinks ? (
            <>
              <Divider />
              <Typography.Title level={4}>Enlaces de interés</Typography.Title>
              <SocialLinks
                links={artist.data?.socialLinks.filter((link) => link)}
              />
            </>
          ) : null}
        </Card>
      </Col>
    </Row>
  );
};

export default ArtistPage;
