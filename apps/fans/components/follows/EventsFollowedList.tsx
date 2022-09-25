import { FollowType, FollowUserEventDTO } from '@melomaniapp/contracts/follow';
import { useFollows } from '@melomaniapp/hooks';
import { Card, List } from 'antd';
import { Session } from 'next-auth';
import Link from 'next/link';

interface EventsFollowListProps {
  session: Session;
}

export const EventsFollowedList: React.FC<EventsFollowListProps> = ({
  session,
}) => {
  const follows = useFollows<FollowUserEventDTO>(FollowType.Event, session);

  const events = follows.data?.map((follow) => ({
    ...follow.event,
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
      dataSource={events}
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
              title={<Link href={`/events/${item._id}`}>{item.name}</Link>}
            />
            {item.description}
          </List.Item>
        </Card>
      )}
    />
  );
};
