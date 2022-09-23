import { useEstablishment, useEvent, useGenres } from '@melomaniapp/hooks';

import { Card, Col, Divider, Row, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';

import { GenreList, ProfileHeader } from '@melomaniapp/ui';

const formatDateTime = (date: Date) => {
  const hours =
    date.getHours() < 10
      ? date.getHours().toString().concat('0')
      : date.getHours();

  return (
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    hours +
    ':' +
    date.getMinutes()
  );
};

export const EventPage = () => {
  const [session] = useSession();
  const router = useRouter();

  const { id, establishmentId } = router.query;

  const { data, isLoading } = useEvent(id as string);

  const establishment = useEstablishment(establishmentId as string);

  if (isLoading || establishment?.isLoading) {
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
          marginBottom: '30px',
        }}
        justify="center"
      >
        <Col span={12} style={{ margin: 'auto' }}>
          <ProfileHeader
            name={data?.event?.name}
            path={`${data?.event?._id}/edit`}
          />
        </Col>
        <Col span={10} offset={2} style={{ margin: 'auto' }}>
          <Card style={{ background: '#fffafa', borderRadius: '20px' }}>
            <Typography.Title level={4}>Organización</Typography.Title>
            <Typography.Paragraph>
              {establishment?.data?.name}
            </Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>Fecha de inicio</Typography.Title>
            <Typography.Paragraph>
              {data?.event?.startsAt &&
                formatDateTime(new Date(data?.event?.startsAt))}
            </Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>Fecha de fin</Typography.Title>
            <Typography.Paragraph>
              {data?.event?.endsAt &&
                formatDateTime(new Date(data?.event?.endsAt))}
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      <Card style={{ background: '#fffafa', borderRadius: '20px' }}>
        <Typography.Title level={4}>Descripción</Typography.Title>
        <Typography.Paragraph>{data?.event?.description}</Typography.Paragraph>
        <Divider />
        <Typography.Title level={4}>Géneros</Typography.Title>
        <GenreList genres={data?.genres} />
        <Divider />
        <Typography.Title level={4}>Dirección</Typography.Title>
        <Typography.Paragraph>{`${data?.event?.address?.full}, ${data?.event?.address?.city}`}</Typography.Paragraph>
      </Card>
    </Layout>
  );
};

export default EventPage;
