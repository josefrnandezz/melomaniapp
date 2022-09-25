import {
  useArtists,
  useEstablishment,
  useEvent,
  useGenres,
  useMyEstablishment,
} from '@melomaniapp/hooks';

import { Avatar, Card, Col, Divider, List, Row, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { GenreList, ProfileHeader } from '@melomaniapp/ui';
import Link from 'next/link';

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

  const { id } = router.query;

  const { data, isLoading } = useEvent(id as string);

  const establishment = useMyEstablishment(session);

  if (isLoading || establishment?.isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  return (
    <>
      <Row
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          marginBottom: '30px',
        }}
      >
        <Col span={12}>
          <ProfileHeader
            name={data?.event?.name}
            path={`${data?.event?._id}/edit`}
          />
        </Col>
        <Col span={11} offset={1}>
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

      <Row>
        <Col span={12}>
          <Card
            style={{
              background: '#fffafa',
              borderRadius: '20px',
              marginBottom: '30px',
            }}
          >
            <Typography.Title level={4}>Artistas</Typography.Title>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={data?.artists}
              renderItem={(item) => (
                <Card
                  bordered={true}
                  style={{
                    marginBottom: '20px',
                    background: '#cae9ff',
                    borderRadius: '20px',
                  }}
                >
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={
                            <img
                              referrerPolicy="no-referrer"
                              src={item.imageUrl}
                            />
                          }
                          size="large"
                        />
                      }
                      title={item.name}
                    />
                  </List.Item>
                </Card>
              )}
            />
          </Card>
        </Col>

        <Col span={11} offset={1}>
          <Card
            style={{
              background: '#fffafa',
              borderRadius: '20px',
              marginBottom: '30px',
            }}
          >
            <Typography.Title level={4}>Descripción</Typography.Title>
            <Typography.Paragraph>
              {data?.event?.description}
            </Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>Géneros</Typography.Title>
            <GenreList genres={data?.genres} />
            <Divider />
            <Typography.Title level={4}>Dirección</Typography.Title>
            <Typography.Paragraph>{`${data?.event?.address?.full}, ${data?.event?.address?.city}`}</Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EventPage;
