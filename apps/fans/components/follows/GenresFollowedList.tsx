import { FollowType, FollowUserGenreDTO } from '@melomaniapp/contracts/follow';
import { useFollows } from '@melomaniapp/hooks';
import { Card, List } from 'antd';
import { Session } from 'next-auth';
import Link from 'next/link';
import { capitalizeFirstLetter } from '../../utils';

interface GenresFollowedListProps {
  session: Session;
}

export const GenresFollowedList: React.FC<GenresFollowedListProps> = ({
  session,
}) => {
  const follows = useFollows<FollowUserGenreDTO>(FollowType.Genre, session);

  const genres = follows.data?.map((follow) => ({
    _id: follow.followedToId,
    name: follow.genre.name,
  }));

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 4,
      }}
      dataSource={genres}
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
              title={
                <Link href={`/genres/${item._id}`}>
                  {capitalizeFirstLetter(item.name)}
                </Link>
              }
            />
          </List.Item>
        </Card>
      )}
    />
  );
};
