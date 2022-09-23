import { useGenres, useMyEstablishment } from '@melomaniapp/hooks';

import { Card, Col, Divider, Row, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { Layout } from '../../components/layout/Layout';

import { GenreList, ProfileHeader } from '@melomaniapp/ui';

export const ProfilePage = () => {
  const [session] = useSession();

  const { data, isLoading } = useMyEstablishment(session);
  const genres = useGenres();

  if (isLoading || genres.isLoading) {
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
          height: '100%',
          width: '100%',
          marginBottom: '30px',
          justifyContent: 'center',
        }}
        justify="center"
      >
        <Col span={12} style={{ margin: 'auto' }}>
          <ProfileHeader name={data?.name} path="profile/edit" />;
        </Col>
        <Col span={10} offset={2} style={{ margin: 'auto' }}>
          <Card style={{ background: '#fffafa', borderRadius: '20px' }}>
            <Typography.Title level={4}>Descripción</Typography.Title>
            <Typography.Paragraph>{data?.description}</Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>Géneros</Typography.Title>
            <GenreList
              genres={genres.data?.filter((genre) =>
                data?.genreIds.includes(genre._id)
              )}
            />
            <Divider />
            <Typography.Title level={4}>Dirección</Typography.Title>
            <Typography.Paragraph>{`${data?.address.full}, ${data?.address.city}`}</Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfilePage;
