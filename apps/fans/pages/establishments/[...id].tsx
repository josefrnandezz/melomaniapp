import {
  useEstablishment,
  useEventsByEstablishment,
  useGenres,
  useUser,
} from '@melomaniapp/hooks';
import { Card, Col, Divider, List, Row, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { ProfileHeader } from '../../components/ProfileHeader';
import { GenreList } from '@melomaniapp/ui';
import { CalendarOutlined } from '@ant-design/icons';
import { FollowType } from '@melomaniapp/contracts/follow';
import Link from 'next/link';
import { IconText } from '../../components/IconText';

export const EstablishmentPage: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [session, isLoading] = useSession();

  const { data: user } = useUser(session);

  const { data: genres } = useGenres();
  const { data: events } = useEventsByEstablishment(id);
  const { data: establishment } = useEstablishment(id);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const followRoute = `users/${user?._id}/follows_to/establishments/${establishment?._id}`;

  const unfollowRoute = `users/${user?._id}/unfollows_to/establishments/${establishment?._id}`;

  const formatDate = (item) => {
    const date = new Date(item.startsAt);
    const formattedDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

    return <IconText text={formattedDate} icon={CalendarOutlined} />;
  };

  return (
    <>
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
          <ProfileHeader
            type={FollowType.Establishment}
            id={establishment?._id}
            name={establishment?.name}
            alias={establishment?.alias}
            followRoute={followRoute}
            unfollowRoute={unfollowRoute}
            session={session}
            imageUrl={establishment?.imageUrl}
          />
        </Col>
        <Col span={10} offset={2} style={{ margin: 'auto' }}>
          <Card style={{ background: '#fffafa', borderRadius: '20px' }}>
            <Typography.Title level={4}>Descripción</Typography.Title>
            <Typography.Paragraph>
              {establishment?.description}
            </Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>Géneros</Typography.Title>
            <GenreList
              genres={genres?.filter((genre) =>
                establishment?.genreIds.includes(genre._id)
              )}
            />
            <Divider />
            <Typography.Title level={4}>Dirección</Typography.Title>
            <Typography.Paragraph>{`${establishment?.address.full}, ${establishment?.address.city}`}</Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      <Card
        style={{
          background: '#fffafa',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
        }}
      >
        <Typography.Title level={4}>Eventos</Typography.Title>
        <Divider />
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={events}
          renderItem={(item) => (
            <Card
              bordered={true}
              hoverable
              style={{
                marginBottom: '20px',
                background: '#cae9ff',
                borderRadius: '20px',
              }}
            >
              <Link href={`/events/${item._id}`}>
                <List.Item key={item._id}>
                  <List.Item.Meta
                    title={
                      <Link href={`/events/${item._id}`}>{item.name}</Link>
                    }
                    description={formatDate(item)}
                  />
                </List.Item>
              </Link>
            </Card>
          )}
        />
      </Card>
    </>
  );
};

export default EstablishmentPage;
