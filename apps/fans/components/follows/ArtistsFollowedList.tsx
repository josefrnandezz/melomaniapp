import { FollowType, FollowUserArtistDTO } from '@melomaniapp/contracts/follow';
import { useFollows } from '@melomaniapp/hooks';
import { Card, List } from 'antd';
import { Session } from 'next-auth';
import Link from 'next/link';

interface ArtistsFollowedListProps {
  session: Session;
}

export const ArtistsFollowedList: React.FC<ArtistsFollowedListProps> = ({
  session,
}) => {
  const follows = useFollows<FollowUserArtistDTO>(FollowType.Artist, session);

  const artists = follows.data?.map((follow) => ({
    ...follow.artist,
    _id: follow.followedToId,
  }));

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={artists}
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
          <Link href={`/artists/${item._id}`}>
            <List.Item
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
          </Link>
        </Card>
      )}
    />
  );
};
