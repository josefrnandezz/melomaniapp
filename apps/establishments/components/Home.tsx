import { useEvents, useGenres } from '@melomaniapp/hooks';
import { GenreList, IconText } from '@melomaniapp/ui';
import { Button, Card, Col, List, Row, Space, Typography } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { UserAddOutlined, PlusCircleFilled } from '@ant-design/icons';

import Link from 'next/link';
import { Layout } from './layout/Layout';

export const MyEvents = () => {
  const [session] = useSession();
  const router = useRouter();

  const events = useEvents();
  const genres = useGenres();

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
    </>
  );
};

export default MyEvents;
