import { useEstablishmentEvents, useGenres } from '@melomaniapp/hooks';
import { GenreList } from '@melomaniapp/ui';
import { Button, Card, Col, List, Row, Space, Typography } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

import Link from 'next/link';

interface HomeProps {
  establishmentId: string;
}

export const Home: React.FC<HomeProps> = ({ establishmentId }) => {
  const events = useEstablishmentEvents(establishmentId);
  const genres = useGenres();

  if (events.isLoading || genres.isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <Row
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          marginBottom: '30px',
        }}
        justify="center"
      >
        <Col span={24}></Col>
        <Card
          style={{
            margin: 'auto',
            borderRadius: '20px',
          }}
        >
          <Typography.Title level={3}>Crea un nuevo evento 🎉</Typography.Title>
          <Space direction="vertical">
            <Link href="/events/create">
              <Button
                style={{
                  borderRadius: '20px',
                  marginLeft: '75px',
                }}
                icon={<PlusCircleFilled />}
                type="primary"
              >
                Crear
              </Button>
            </Link>
          </Space>
        </Card>
      </Row>
      <Card style={{ borderRadius: '20px' }}>
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
              <Link
                href={{
                  pathname: `/events/${item._id}`,
                  query: { establishmentId },
                }}
              >
                <List.Item>
                  <List.Item.Meta
                    title={<Link href={`events/${item._id}`}>{item.name}</Link>}
                    description={item.description}
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

export default Home;
