import {
  FollowType,
  FollowUserEstablishmentDTO,
} from '@melomaniapp/contracts/follow';
import { useFollows } from '@melomaniapp/hooks';
import { Avatar, Card, List } from 'antd';
import { Session } from 'next-auth';
import Link from 'next/link';

interface EstablishmentsFollowedListProps {
  session: Session;
}

export const EstablishmentsFollowedList: React.FC<
  EstablishmentsFollowedListProps
> = ({ session }) => {
  const follows = useFollows<FollowUserEstablishmentDTO>(
    FollowType.Establishment,
    session
  );

  const establishments = follows.data?.map((follow) => ({
    ...follow.establishment,
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
      dataSource={establishments}
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
          <Link href={`/establishments/${item._id}`}>
            <List.Item key={item._id}>
              <List.Item.Meta
                title={
                  <Link href={`/establishments/${item._id}`}>{item.name}</Link>
                }
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
          </Link>
        </Card>
      )}
    />
  );
};
