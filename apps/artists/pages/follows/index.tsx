import { FollowType } from '@melomaniapp/contracts/follow';

import { useArtistFollows } from '@melomaniapp/hooks';

import { Avatar, Card, List, PageHeader, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

const Follows: React.FC = () => {
  const [session] = useSession();

  const follows = useArtistFollows(FollowType.Artist, session);

  if (follows?.isLoading) {
    return <Spin size="large" />;
  }

  return (
    <PageHeader
      style={{ margin: 'auto', borderRadius: '20px' }}
      ghost={false}
      onBack={() => window.history.back()}
      title="Conexiones"
    >
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
            <Link href={`/artists/${item.followedTo._id}`}>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        <img
                          referrerPolicy="no-referrer"
                          src={item.followedTo.imageUrl}
                        />
                      }
                      size="large"
                    />
                  }
                  title={
                    <Link href={`artists/${item.followedTo._id}`}>
                      {item.followedTo.name}
                    </Link>
                  }
                  description={item.followedTo.description}
                />
              </List.Item>
            </Link>
          </Card>
        )}
      />
    </PageHeader>
  );
};

export default Follows;
