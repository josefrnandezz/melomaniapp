import { FollowType } from '@melomaniapp/contracts/follow';

import {
  useArtistFollowers,
  useArtistFollows,
  useMyArtist,
} from '@melomaniapp/hooks';

import { Avatar, Card, List, PageHeader, Spin, Tabs } from 'antd';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

const Follows: React.FC = () => {
  const [session] = useSession();

  const { data: artist } = useMyArtist(session);

  const follows = useArtistFollows(FollowType.Artist, session);
  const followers = useArtistFollowers(session, artist?._id);

  if (follows?.isLoading || followers.isLoading) {
    return <Spin size="large" />;
  }

  return (
    <PageHeader
      style={{ margin: 'auto', borderRadius: '20px' }}
      ghost={false}
      onBack={() => window.history.back()}
      title="Conexiones"
    >
      <Tabs>
        <Tabs.TabPane tab="Seguidores" key="followers">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 4,
            }}
            dataSource={followers?.data}
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
                <Link href={`/artists/${item.followedToId}`}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src="https://joeschmoe.io/api/v1/random"
                          size="large"
                        />
                      }
                      title={
                        <Link href={`artists/${item.followedToId}`}>
                          {item.artist.name}
                        </Link>
                      }
                      description={item.artist.description}
                    />
                  </List.Item>
                </Link>
              </Card>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seguidos" key="following">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 4,
            }}
            dataSource={follows?.data}
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
                <Link href={`/artists/${item.followedToId}`}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src="https://joeschmoe.io/api/v1/random"
                          size="large"
                        />
                      }
                      title={
                        <Link href={`artists/${item.followedToId}`}>
                          {item.artist.name}
                        </Link>
                      }
                      description={item.artist.description}
                    />
                  </List.Item>
                </Link>
              </Card>
            )}
          />
        </Tabs.TabPane>
      </Tabs>
    </PageHeader>
  );
};

export default Follows;
