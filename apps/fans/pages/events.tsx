import { UserAddOutlined } from '@ant-design/icons';
import { useEvents, useGenres } from '@melomaniapp/hooks';
import { GenreList } from '@melomaniapp/ui';
import { Card, Divider, List, PageHeader, Space, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';
import { IconText } from '../components/IconText';
import { Layout } from '../components/layout/Layout';

const Events: React.FC = () => {
  const [session, loading] = useSession();

  const events = useEvents();
  const genres = useGenres();

  if (events?.isLoading || genres?.isLoading) {
    return <Spin size="large" />;
  }

  const router = useRouter();

  return (
    <Layout session={session}>
      <PageHeader
        style={{ margin: 'auto' }}
        ghost={false}
        onBack={() => window.history.back()}
        title="Eventos"
      >
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
      </PageHeader>
    </Layout>
  );
};

export default Events;
