import { useGenres, useMyEstablishment } from '@melomaniapp/hooks';

import { Card, Col, Divider, Row, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';

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
    <div>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <ProfileHeader
            name={data?.name}
            path="profile/edit"
            imageUrl={data?.imageUrl}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={18}>
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
            <Typography.Paragraph>{`${data?.address.city}, ${data?.address.full}`}</Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
