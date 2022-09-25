import { FollowType, FollowUserArtistDTO } from '@melomaniapp/contracts/follow';
import { useFollows } from '@melomaniapp/hooks';
import { Card, List } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
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
          <List.Item key={item._id}>
            <List.Item.Meta
              title={<Link href={`/artists/${item._id}`}>{item.name}</Link>}
              avatar={
                <Avatar
                  size="large"
                  src={
                    <img referrerPolicy="no-referrer" src={item?.imageUrl} />
                  }
                />
              }
              description={`@${item.alias}`}
            />
          </List.Item>
        </Card>
      )}
    />
  );
};
