import { UserAddOutlined } from '@ant-design/icons';
import { useArtists, useGenres } from '@melomaniapp/hooks';
import { GenreList, IconText } from '@melomaniapp/ui';
import { Card, List, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';

const Artists: React.FC = () => {
  const [session, loading] = useSession();

  const artists = useArtists();
  const genres = useGenres();

  if (artists?.isLoading || genres?.isLoading) {
    return <Spin size="large" />;
  }

  const router = useRouter();

  return (
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
              <List.Item.Meta
                title={item.name}
                description={`@${item.alias}`}
              />

              {item.description}
            </List.Item>
          </Card>
        )}
      />
    </Card>
  );
};

export default Artists;
