import { UserAddOutlined } from '@ant-design/icons';

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

const Follows: React.FC = () => {
  const [session, loading] = useSession();

  const events = useEvents();
  const artists = useArtists();
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
        </Tabs>
      </PageHeader>
    </Layout>
  );
};

export default Follows;
