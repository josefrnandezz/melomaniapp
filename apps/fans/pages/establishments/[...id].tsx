import {
  useEstablishment,
  useEventsByEstablishment,
  useGenres,
} from '@melomaniapp/hooks';
import { UserAddOutlined } from '@ant-design/icons';
import { Card, Col, Divider, List, Row, Space, Spin, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';
import { ProfileHeader } from '../../components/ProfileHeader';

import { GenreList } from '@melomaniapp/ui';
import { IconText } from '../../components/IconText';

export const EstablishmentPage = () => {
  const [session] = useSession();
  const router = useRouter();

  const { id } = router.query;

  const { data: establishment, isLoading } = useEstablishment(id as string);
  const genres = useGenres();
  const events = useEventsByEstablishment(id as string);

  if (isLoading || genres?.isLoading || events?.isLoading) {
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
          <ProfileHeader
            name={establishment?.name}
            alias={establishment?.alias}
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
              genres={genres.data?.filter((genre) =>
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
          dataSource={events?.data}
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
              <List.Item
                onClick={() => router.push(`/events/${item._id}`)}
                key={item._id}
                actions={[
                  <IconText
                    icon={UserAddOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <GenreList
                    genres={genres.data?.filter((genre) =>
                      item.genreIds.includes(genre._id)
                    )}
                  />,
                ]}
                extra={
                  <img
                    style={{ textAlign: 'left' }}
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta title={item.name} />

                {item.description}
              </List.Item>
            </Card>
          )}
        />
      </Card>
    </Layout>
  );
};

export default EstablishmentPage;
