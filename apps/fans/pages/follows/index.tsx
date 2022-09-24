import {
  useArtists,
  useEstablishments,
  useEvents,
  useGenres,
} from '@melomaniapp/hooks';

import { Card, List, PageHeader, Spin, Tabs } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';

import { Layout } from '../../components/layout/Layout';
import { capitalizeFirstLetter } from '../../utils';

const Follows: React.FC = () => {
  const [session, loading] = useSession();

  const events = useEvents('Córdoba', session);
  const artists = useArtists();
  const genres = useGenres();
  const establishments = useEstablishments();

  if (
    events?.isLoading ||
    artists?.isLoading ||
    events?.isLoading ||
    establishments?.isLoading
  ) {
    return <Spin size="large" />;
  }

  const router = useRouter();

  return (
    <Layout session={session}>
      <PageHeader
        style={{ margin: 'auto', borderRadius: '20px' }}
        ghost={false}
        onBack={() => window.history.back()}
        title="Subscripciones"
      >
        <Tabs>
          <Tabs.TabPane tab="Eventos" key="events">
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
          </Tabs.TabPane>
          <Tabs.TabPane tab="Artistas" key="artists">
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              dataSource={artists?.data}
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
                    onClick={() => router.push(`/artists/${item._id}`)}
                    key={item._id}
                    extra={
                      <img
                        style={{ textAlign: 'left' }}
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      title={item.name}
                      description={`@${item.alias}`}
                    />

                    {item.description}
                  </List.Item>
                </Card>
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Establecimientos" key="establishments">
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              dataSource={establishments?.data}
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
                    onClick={() => router.push(`/establishments/${item._id}`)}
                    key={item._id}
                    extra={
                      <img
                        style={{ textAlign: 'left' }}
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      title={item.name}
                      description={`@${item.alias}`}
                    />

                    {item.description}
                  </List.Item>
                </Card>
              )}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Géneros" key="genres">
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              dataSource={genres?.data}
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
                    onClick={() => router.push(`/genres/${item._id}`)}
                    key={item._id}
                  >
                    <List.Item.Meta
                      title={item.name && capitalizeFirstLetter(item.name)}
                    />
                  </List.Item>
                </Card>
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      </PageHeader>
    </Layout>
  );
};

export default Follows;
