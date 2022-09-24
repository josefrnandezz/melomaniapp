import { useGenres, useUser } from '@melomaniapp/hooks';

import { Card, Col, Divider, Row, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';

import { GenreList } from '@melomaniapp/ui';

import { Layout } from '../../components/layout/Layout';
import { FanProfileHeader } from '../../components/fans/FanProfileHeader';

export const ProfilePage = () => {
  const [session, isSessionLoading] = useSession();

  const genres = useGenres();
  const { data: user } = useUser(session);

  if (isSessionLoading || genres?.isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

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
          <FanProfileHeader name={session?.user.name} session={session} />
        </Col>
        <Col span={10} offset={2} style={{ margin: 'auto' }}>
          <Card style={{ background: '#fffafa', borderRadius: '20px' }}>
            <Typography.Title level={4}>Ciudad</Typography.Title>
            <Typography.Paragraph>{user?.city}</Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>Géneros</Typography.Title>
            <GenreList
              genres={genres.data?.filter((genre) =>
                user?.genres.includes(genre._id)
              )}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfilePage;
